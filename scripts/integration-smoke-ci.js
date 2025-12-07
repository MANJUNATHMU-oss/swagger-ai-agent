const fetch = require('node-fetch');

async function run() {
  const base = 'http://localhost:3000/api/environment';
  console.log('Creating environment...');
  const createRes = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'ci-smoke', specId: 'ci-spec', baseUrl: 'http://example' }),
  });
  const created = await createRes.json();
  console.log('Created:', created);

  console.log('Listing by spec...');
  const listRes = await fetch(`${base}/spec/ci-spec`);
  console.log('List:', await listRes.json());

  console.log('Getting by id...');
  const getRes = await fetch(`${base}/${created.id}`);
  console.log('Get:', await getRes.json());

  console.log('Updating...');
  const updRes = await fetch(`${base}/${created.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'ci-updated' }),
  });
  console.log('Updated:', await updRes.json());

  console.log('Deleting...');
  const delRes = await fetch(`${base}/${created.id}`, { method: 'DELETE' });
  console.log('Delete status:', delRes.status);

  console.log('CI smoke finished successfully');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
