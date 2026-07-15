const fs = require('fs');

const p = 'blog-posts/blog-index.json';
let raw = fs.readFileSync(p, 'utf8');

// Strip BOM
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);

// The mojibake patterns that need careful replacement in JSON:
// 1. Em dash mojibake: U+00E2 U+20AC U+201D (â€") -> " - "
// 2. En dash mojibake: U+00E2 U+20AC U+201C (â€") -> "-"
// 3. Smart apostrophe mojibake: U+00E2 U+20AC U+2122 (â€™) -> "'"

// Fix the double-quote-broken instances: where a raw " was inserted mid-JSON-string
// Strategy: work character by character to find unescaped " inside string values
// and replace with \\"
let result = '';
let inString = false;
let escaped = false;
let i = 0;

// Track if we're in a JSON key or value to know context
let prevNonSpace = '';

while (i < raw.length) {
  const ch = raw[i];
  
  if (escaped) {
    result += ch;
    escaped = false;
    i++;
    continue;
  }
  
  if (ch === '\\' && inString) {
    result += ch;
    escaped = true;
    i++;
    continue;
  }
  
  if (ch === '"') {
    if (!inString) {
      // Opening a string
      inString = true;
      result += ch;
    } else {
      // Could be closing the string OR an unescaped " inside the string
      // Look ahead to see what follows (skip whitespace)
      let j = i + 1;
      while (j < raw.length && (raw[j] === ' ' || raw[j] === '\t')) j++;
      const next = raw[j];
      // If followed by : or , or } or ] or newline, it's a legitimate string close
      if (next === ':' || next === ',' || next === '}' || next === ']' || next === '\n' || next === '\r' || j >= raw.length) {
        inString = false;
        result += ch;
      } else {
        // This is an unescaped " inside a string value - escape it
        result += '\\"';
      }
    }
    i++;
    continue;
  }
  
  // Handle mojibake patterns still in the text (U+00E2 U+20AC + next)
  if (ch === '\u00E2' && i + 1 < raw.length && raw[i+1] === '\u20AC') {
    const third = raw[i+2];
    if (third === '\u201D' || third === '\u201C' || third === '\u2122') {
      // Mojibake dash/quote - replace with appropriate ASCII
      if (third === '\u2122') {
        result += inString ? "'" : "'"; // smart apostrophe
      } else {
        result += '-'; // en/em dash
      }
      i += 3;
      continue;
    }
  }
  
  result += ch;
  i++;
}

// Validate
try {
  JSON.parse(result);
  console.log('JSON is valid!');
  fs.writeFileSync(p, result, 'utf8');
  console.log('Written to disk');
} catch (e) {
  console.error('Still invalid:', e.message);
  // Show context around the error
  const pos = parseInt(e.message.match(/position (\d+)/)?.[1] || 0);
  console.log('Context:', JSON.stringify(result.substring(pos - 30, pos + 30)));
}
