
const BASE_ID = 'app0W81GVN9Jvx59S';
const TOKEN = process.env.AIRTABLE_API_TOKEN || '';

const tables = [
  'Events',
  'Council Members',
  'Partners',
  'News & Announcements',
  'Cities / Regions',
  'WGC Divisions',
  'Site Stats',
  'Past Event Spotlights',
  'Applications'
];

async function test() {
  for (const table of tables) {
    try {
      const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(table)}?maxRecords=1`, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });
      console.log(`Table: ${table} - Status: ${res.status}`);
      if (res.ok) {
        const data = await res.json();
        if (data.records && data.records.length > 0) {
          console.log(`  First record fields:`, Object.keys(data.records[0].fields));
        } else {
          console.log(`  No records found.`);
        }
      } else {
        const err = await res.json();
        console.log(`  Error:`, err.error.type);
      }
    } catch (e) {
      console.log(`  Fetch failed for ${table}:`, e.message);
    }
  }
}

test();
