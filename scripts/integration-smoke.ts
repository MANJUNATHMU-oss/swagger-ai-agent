import fetch from 'node-fetch';
import { spawn } from 'child_process';
import path from 'path';

const ROOT = path.resolve(__dirname, '..');
const SERVER_ENTRY = path.join(ROOT, 'src', 'core', 'server.ts');

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  console.log('Starting dev server (npm run dev)...');
  const proc = spawn('npm', ['run', 'dev'], { stdio: ['ignore', 'inherit', 'inherit'], shell: true });

  // wait for server to boot
  await wait(4500);

  try {
    const base = 'http://localhost:3000/api/environment';
    console.log('Creating environment...');
    const createRes = await fetch(base, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'smoke', specId: 'smoke-spec', baseUrl: 'http://example' }),
    });
    const created: any = await createRes.json();
    console.log('Created:', created);

    console.log('Listing by spec...');
    const listRes = await fetch(`${base}/spec/smoke-spec`);
    console.log('List:', await listRes.json());

    console.log('Getting by id...');
    const getRes = await fetch(`${base}/${created.id}`);
    console.log('Get:', await getRes.json());

    console.log('Updating...');
    const updRes = await fetch(`${base}/${created.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'smoke-updated' }),
    });
    console.log('Updated:', await updRes.json());

    console.log('Deleting...');
    const delRes = await fetch(`${base}/${created.id}`, { method: 'DELETE' });
    console.log('Delete status:', delRes.status);

    console.log('Smoke finished successfully');
  } catch (err) {
    console.error('Smoke failed:', err);
  } finally {
    proc.kill();
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
