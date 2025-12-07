import NormalizedSpec from '../../domain/models/NormalizedSpec';

export class OpenApiNormalizer {
  static normalize(parsed: any, id: string): NormalizedSpec {
    const title = parsed.info && parsed.info.title ? parsed.info.title : 'Imported API';
    const version = parsed.info && parsed.info.version ? parsed.info.version : undefined;
    const servers = (parsed.servers || []).map((s: any) => (typeof s === 'string' ? s : s.url));

    const operations: any[] = [];
    const paths = parsed.paths || {};
    for (const pathKey of Object.keys(paths)) {
      const methods = paths[pathKey];
      for (const methodKey of Object.keys(methods)) {
        const op = methods[methodKey];
        const operation = {
          operationId: op.operationId || `${methodKey.toUpperCase()}_${pathKey}`,
          method: methodKey.toUpperCase(),
          path: pathKey,
          tags: op.tags || [],
          summary: op.summary,
          description: op.description,
          parameters: op.parameters || [],
          requestBody: op.requestBody || null,
          responses: Object.keys(op.responses || {}).map((s) => ({ statusCode: Number(s), description: op.responses[s].description })),
          security: op.security || []
        };
        operations.push(operation);
      }
    }

    const spec: NormalizedSpec = {
      id,
      title,
      version,
      description: parsed.info && parsed.info.description ? parsed.info.description : undefined,
      servers,
      tags: parsed.tags ? parsed.tags.map((t: any) => t.name) : [],
      operations,
      raw: parsed
    };

    return spec;
  }
}

export default OpenApiNormalizer;
