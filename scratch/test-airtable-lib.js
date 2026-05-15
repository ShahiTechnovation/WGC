require('ts-node').register({ transpileOnly: true });
const { getPartners, getEvents } = require('./lib/airtable.ts');

async function test() {
  console.log('Fetching Partners...');
  const partners = await getPartners();
  console.log(`Found ${partners.length} partners.`);
  if (partners.length > 0) {
    console.log('Sample partner:', partners[0]);
  }

  console.log('\nFetching Events...');
  const events = await getEvents();
  console.log(`Found ${events.length} events.`);
}

test().catch(console.error);
