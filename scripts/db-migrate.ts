import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

const dbFile = process.env.SQLITE_DB_FILE || path.join(__dirname, '..', 'data', 'db.sqlite');

async function migrate() {
  const db = await sqlite.open({ filename: dbFile, driver: sqlite3.Database });
  await db.run(`
    CREATE TABLE IF NOT EXISTS migrations (id TEXT PRIMARY KEY, applied_at TEXT);
  `);

  // environments table
  await db.run(`
    CREATE TABLE IF NOT EXISTS environments (
      id TEXT PRIMARY KEY,
      specId TEXT,
      name TEXT,
      baseUrl TEXT,
      defaultHeaders TEXT,
      authConfig TEXT,
      disabled INTEGER
    )
  `);

  console.log('Migrations applied to', dbFile);
  await db.close();
}

migrate().catch((e) => {
  console.error(e);
  process.exit(1);
});
