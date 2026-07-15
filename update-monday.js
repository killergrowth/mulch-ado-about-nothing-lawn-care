const https = require('https');

const token = process.env.MONDAY_TOKEN;

const mutation = {
  query: `mutation {
    change_column_value(
      board_id: 10078098401,
      item_id: 12396305822,
      column_id: "color_mkvx2hdn",
      value: "{\\"label\\":\\"Client Reviewing\\"}"
    ) { id name }
  }`
};

const body = JSON.stringify(mutation);
const req = https.request({
  hostname: 'api.monday.com',
  path: '/v2',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const r = JSON.parse(d);
    if (r.errors) { console.error('Error:', JSON.stringify(r.errors)); }
    else { console.log('Updated:', r.data.change_column_value.name); }
  });
});
req.write(body);
req.end();
