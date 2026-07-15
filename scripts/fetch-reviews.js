'use strict';
const crypto = require('crypto');
const https  = require('https');
const http   = require('http');
const fs     = require('fs');
const path   = require('path');

// ── Read reviewsUrl from _build-data.js ───────────────────────────────────
const buildData = require('../_build-data.js');
const REVIEWS_URL = (buildData.CLIENT && buildData.CLIENT.reviewsUrl) || '';
if (!REVIEWS_URL) { console.log('No reviewsUrl in _build-data.js — skipping.'); process.exit(0); }

const OUT_FILE = path.join(__dirname, '..', 'data', 'reviews.json');

// ── URL resolution: follow redirects to get the final Google Maps URL ─────
function followRedirect(url, maxHops = 8) {
  return new Promise((resolve, reject) => {
    if (maxHops <= 0) return reject(new Error('Too many redirects'));
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        res.resume();
        resolve(followRedirect(next, maxHops - 1));
      } else {
        res.resume();
        resolve(url);
      }
    });
    req.on('error', reject);
    req.end();
  });
}

// ── Extract Place ID from a resolved Google Maps URL ──────────────────────
function extractPlaceId(url) {
  const chij = url.match(/ChIJ[A-Za-z0-9_-]+/);
  if (chij) return chij[0];
  try {
    const u = new URL(url);
    const pid = u.searchParams.get('place_id');
    if (pid) return pid;
  } catch {}
  return null;
}

function getServiceAccount() {
  const raw = process.env.GOOGLE_SA_JSON;
  if (!raw) { console.error('GOOGLE_SA_JSON not set'); process.exit(1); }
  return JSON.parse(raw);
}
function makeJwt(clientEmail, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const claims = Buffer.from(JSON.stringify({ iss: clientEmail, scope: 'https://www.googleapis.com/auth/cloud-platform', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 })).toString('base64url');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(header + '.' + claims);
  return header + '.' + claims + '.' + sign.sign(privateKey, 'base64url');
}
function httpRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => { let data = ''; res.on('data', c => { data += c; }); res.on('end', () => resolve({ status: res.statusCode, body: data })); });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}
async function getAccessToken(clientEmail, privateKey) {
  const jwt = makeJwt(clientEmail, privateKey);
  const body = 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=' + jwt;
  const res = await httpRequest({ hostname: 'oauth2.googleapis.com', path: '/token', method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) } }, body);
  const parsed = JSON.parse(res.body);
  if (!parsed.access_token) throw new Error('Token error: ' + res.body);
  return parsed.access_token;
}

async function findPlaceIdByName(token) {
  const name = encodeURIComponent((buildData.CLIENT.name || '') + ' Kansas City MO');
  const res = await httpRequest({
    hostname: 'places.googleapis.com',
    path: `/v1/places:searchText`,
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json', 'X-Goog-FieldMask': 'places.id,places.displayName' }
  }, JSON.stringify({ textQuery: decodeURIComponent(name) }));
  if (res.status !== 200) throw new Error(`Text search failed: ${res.status} ${res.body}`);
  const data = JSON.parse(res.body);
  if (data.places && data.places.length > 0) return data.places[0].id.replace('places/', '');
  throw new Error('Place not found by name: ' + decodeURIComponent(name));
}

async function main() {
  let placeId = null;
  console.log(`Resolving: ${REVIEWS_URL}`);
  try {
    const finalUrl = await followRedirect(REVIEWS_URL);
    console.log(`Resolved to: ${finalUrl}`);
    placeId = extractPlaceId(finalUrl);
  } catch(e) {
    console.warn('Redirect resolution failed:', e.message);
  }

  const sa = getServiceAccount();
  let token;
  try { token = await getAccessToken(sa.client_email, sa.private_key); } catch(e) { console.error('Auth failed:', e.message); process.exit(0); }

  if (!placeId) {
    console.log('Place ID not found in URL — falling back to Places Text Search...');
    try { placeId = await findPlaceIdByName(token); } catch(e) { console.error('Fallback failed:', e.message); process.exit(0); }
  }
  console.log(`Using Place ID: ${placeId}`);

  let place;
  try {
    const res = await httpRequest({ hostname: 'places.googleapis.com', path: `/v1/places/${placeId}`, method: 'GET', headers: { 'Authorization': 'Bearer ' + token, 'X-Goog-FieldMask': 'reviews,rating,userRatingCount' } });
    if (res.status !== 200) throw new Error(`Status ${res.status}: ${res.body}`);
    place = JSON.parse(res.body);
  } catch(e) { console.error('Places API failed:', e.message); process.exit(0); }

  const fiveStars = (place.reviews || []).filter(r => r.rating === 5);
  const output = {
    rating: place.rating,
    userRatingCount: place.userRatingCount,
    fetchedAt: new Date().toISOString(),
    reviews: fiveStars.map(r => ({ author: r.authorAttribution.displayName, rating: r.rating, relativeTime: r.relativePublishTimeDescription, text: r.text ? r.text.text : '', publishTime: r.publishTime || null }))
  };
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Wrote reviews.json — rating: ${output.rating}, total: ${output.userRatingCount}, 5-star: ${fiveStars.length}`);
}
main().catch(e => { console.error('Unexpected error:', e.message); process.exit(0); });
