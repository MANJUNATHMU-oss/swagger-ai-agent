import * as path from 'path';
import dotenv from 'dotenv';

export type NodeEnv = 'development' | 'production' | 'test' | 'local';

export interface Env {
  NODE_ENV: NodeEnv;
  PORT?: string;
  HOST?: string;
}

const loadEnv = (): Env => {
  const env = (process.env.NODE_ENV as NodeEnv) || 'development';
  // load .env files: .env, .env.development, .env.production, .env.test
  const base = path.resolve(process.cwd());
  dotenv.config({ path: path.join(base, '.env') });
  dotenv.config({ path: path.join(base, `.env.${env}`) });

  return {
    NODE_ENV: env,
    PORT: process.env.PORT,
    HOST: process.env.HOST
  };
};

export const env = loadEnv();

export default env;
