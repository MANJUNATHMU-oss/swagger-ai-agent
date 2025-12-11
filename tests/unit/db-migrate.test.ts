import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

describe('db migrate', () => {
  test('runs migrations and creates db file', () => {
    const tmp = path.join(__dirname, 'tmp-test-db.sqlite');
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    try {
      execSync(`npm run db:migrate`, { env: { ...process.env, SQLITE_DB_FILE: tmp }, stdio: 'inherit' });
      expect(fs.existsSync(tmp)).toBe(true);
    } finally {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    }
  });
});
