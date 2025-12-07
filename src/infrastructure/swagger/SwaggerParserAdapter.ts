import yaml from 'yaml';

export class SwaggerParserAdapter {
  static parse(text: string): any {
    try {
      // try JSON first
      return JSON.parse(text);
    } catch (_e) {
      // try YAML
      return yaml.parse(text);
    }
  }
}

export default SwaggerParserAdapter;
