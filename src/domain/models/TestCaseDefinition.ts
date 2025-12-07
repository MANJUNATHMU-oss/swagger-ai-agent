export type TestType = 'happy' | 'negative' | 'auth' | 'boundary';

export interface TestCaseDefinition {
  testId: string;
  operationId: string;
  type: TestType;
  expectedStatus: number;
  description?: string;
  payloadTemplate?: any;
}

export default TestCaseDefinition;
