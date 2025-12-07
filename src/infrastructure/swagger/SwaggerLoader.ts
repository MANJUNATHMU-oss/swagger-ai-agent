import axios from 'axios';
import * as fs from 'fs/promises';

export type SpecSource =
  | { type: 'url'; url: string }
  | { type: 'file'; path: string }
  | { type: 'git'; repo: string; ref?: string; filePath?: string };

export class SwaggerLoader {
  static async load(source: SpecSource): Promise<string> {
    if (source.type === 'url') {
      const resp = await axios.get(source.url, { responseType: 'text' });
      return resp.data;
    }

    if (source.type === 'file') {
      return fs.readFile(source.path, 'utf8');
    }

    // git is not implemented in Phase 1
    throw new Error('git source not implemented');
  }
}

export default SwaggerLoader;
