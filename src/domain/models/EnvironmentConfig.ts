export interface AuthConfig {
  type?: 'none' | 'basic' | 'bearer' | 'apiKey';
  username?: string;
  password?: string;
  token?: string;
  apiKeyName?: string;
  apiKeyValue?: string;
}

export interface EnvironmentConfig {
  id: string;
  specId: string;
  name: string;
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  authConfig?: AuthConfig;
  disabled?: boolean;
}

export default EnvironmentConfig;
