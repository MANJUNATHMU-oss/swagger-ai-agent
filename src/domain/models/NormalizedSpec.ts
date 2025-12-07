/**
 * Domain models for Normalized Swagger/OpenAPI representation.
 * Pure TypeScript types — no external dependencies.
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';

export interface Parameter {
  name: string;
  in: 'path' | 'query' | 'header' | 'cookie';
  required: boolean;
  schema?: any; // keep generic for now
  description?: string;
}

export interface RequestBody {
  description?: string;
  required?: boolean;
  content?: Record<string, any>;
}

export interface ResponseDef {
  statusCode: number;
  description?: string;
  content?: Record<string, any>;
}

export interface Operation {
  operationId: string;
  method: HttpMethod;
  path: string;
  tags: string[];
  summary?: string;
  description?: string;
  parameters: Parameter[];
  requestBody?: RequestBody | null;
  responses: ResponseDef[];
  security?: Array<Record<string, string[]>>;
}

export interface NormalizedSpec {
  id: string;
  title: string;
  version?: string;
  description?: string;
  servers: string[];
  tags: string[];
  operations: Operation[];
  raw?: any; // original parsed object for reference
}

export default NormalizedSpec;
