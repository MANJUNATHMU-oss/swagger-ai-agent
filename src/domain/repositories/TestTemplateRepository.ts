import { TestCaseDefinition } from '../models/TestCaseDefinition';

export interface TestTemplateRepository {
  getTemplatesForOperation(operationId: string): Promise<TestCaseDefinition[]>;
}

export default TestTemplateRepository;
