import { HttpMethod as BaseHttpMethod } from './types';

export type HttpMethod = BaseHttpMethod;

export interface Parameter {
  name: string;
  in: 'path' | 'query' | 'header' | 'cookie';
  required: boolean;
  schema?: any;
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

export default Operation;
