import { env } from './env';

type AnyConfig = Record<string, any>;

const loadConfigFile = (name: string): AnyConfig | null => {
  try {
    // dynamic import requires JSON or ts compiled files; use require for simplicity
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const cfg = require(`../../config/${name}`).default;
    return cfg || null;
  } catch (e) {
    return null;
  }
};

const defaultConfig = loadConfigFile('default') || {};
const envConfig = loadConfigFile(env.NODE_ENV) || {};

const merge = (a: AnyConfig, b: AnyConfig): AnyConfig => {
  return { ...a, ...b };
};

export const config = merge(defaultConfig, envConfig);

export default config;
