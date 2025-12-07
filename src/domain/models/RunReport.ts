export interface TestResult {
  testId: string;
  operationId: string;
  status: 'passed' | 'failed' | 'error';
  httpStatus?: number;
  durationMs?: number;
  request?: any;
  response?: any;
}

export interface RunReport {
  runId: string;
  specId: string;
  total: number;
  passed: number;
  failed: number;
  errors: number;
  results: TestResult[];
}

export default RunReport;
