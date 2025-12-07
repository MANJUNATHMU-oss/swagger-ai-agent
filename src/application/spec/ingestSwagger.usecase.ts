import { SpecSource } from '../../infrastructure/swagger/SwaggerLoader';
import SwaggerLoader from '../../infrastructure/swagger/SwaggerLoader';
import SwaggerParserAdapter from '../../infrastructure/swagger/SwaggerParserAdapter';
import OpenApiNormalizer from '../../infrastructure/swagger/OpenApiNormalizer';
import SpecRepository from '../../domain/repositories/SpecRepository';
import { v4 as uuidv4 } from 'uuid';

export async function ingestSwagger(source: SpecSource, repository: SpecRepository) {
  const rawText = await SwaggerLoader.load(source);
  const parsed = SwaggerParserAdapter.parse(rawText);
  const id = uuidv4();
  const normalized = OpenApiNormalizer.normalize(parsed, id);
  await repository.save(normalized as any);
  return normalized;
}

export default ingestSwagger;
