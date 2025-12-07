import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import EnvironmentConfig from '../../domain/models/EnvironmentConfig';
import EnvironmentRepository from '../../domain/repositories/EnvironmentRepository';

export class SqliteEnvironmentRepository implements EnvironmentRepository {
  private db: sqlite.Database | null = null;

  constructor(private filename = ':memory:') {}

  async init() {
    this.db = await sqlite.open({ filename: this.filename, driver: sqlite3.Database });
    await this.db.run(`
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
  }

  private serialize(env: EnvironmentConfig) {
    return [env.id, env.specId, env.name, env.baseUrl, JSON.stringify(env.defaultHeaders || {}), JSON.stringify(env.authConfig || {}), env.disabled ? 1 : 0];
  }

  private deserialize(row: any): EnvironmentConfig {
    return {
      id: row.id,
      specId: row.specId,
      name: row.name,
      baseUrl: row.baseUrl,
      defaultHeaders: row.defaultHeaders ? JSON.parse(row.defaultHeaders) : {},
      authConfig: row.authConfig ? JSON.parse(row.authConfig) : undefined,
      disabled: !!row.disabled,
    } as EnvironmentConfig;
  }

  async save(env: EnvironmentConfig): Promise<EnvironmentConfig> {
    if (!this.db) await this.init();
    const id = env.id || (env.id = require('uuid').v4());
    const sql = `INSERT OR REPLACE INTO environments (id,specId,name,baseUrl,defaultHeaders,authConfig,disabled) VALUES (?,?,?,?,?,?,?)`;
    await this.db!.run(sql, this.serialize(env));
    return env;
  }

  async getById(id: string): Promise<EnvironmentConfig | null> {
    if (!this.db) await this.init();
    const row = await this.db!.get(`SELECT * FROM environments WHERE id = ?`, id);
    if (!row) return null;
    return this.deserialize(row);
  }

  async listBySpec(specId: string): Promise<EnvironmentConfig[]> {
    if (!this.db) await this.init();
    const rows = await this.db!.all(`SELECT * FROM environments WHERE specId = ? AND disabled = 0`, specId);
    return rows.map(this.deserialize.bind(this));
  }

  async update(id: string, patch: Partial<EnvironmentConfig>): Promise<EnvironmentConfig> {
    const existing = await this.getById(id);
    if (!existing) throw new Error('Environment not found');
    const merged = { ...existing, ...patch } as EnvironmentConfig;
    await this.save(merged);
    return merged;
  }

  async delete(id: string): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.run(`DELETE FROM environments WHERE id = ?`, id);
  }
}

export default SqliteEnvironmentRepository;
