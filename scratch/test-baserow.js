const BASEROW_TOKEN = 'UNELOb9gpgHywZCkcjYCRu5VdbXjN6CB';
const tableId = '1002122'; // Partners Table

async function test() {
  const url = `https://api.baserow.io/api/database/rows/table/${tableId}/?user_field_names=true&size=200`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Token ${BASEROW_TOKEN}` },
    });
    const data = await res.json();
    let count = 0;
    for (const record of data.results) {
      const social = record['Social Handle'];
      const website = record['Website URL'];
      if ((social && social !== '') || (website && website !== '')) {
        console.log(`Record ID: ${record.id}`);
        console.log(`  Name: ${record['Organization Name']}`);
        console.log(`  Social Handle: "${social}"`);
        console.log(`  Website URL: "${website}"`);
        count++;
      }
    }
    console.log(`Found ${count} records with populated social/website fields.`);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
