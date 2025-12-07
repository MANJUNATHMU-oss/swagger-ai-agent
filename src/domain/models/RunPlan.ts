import Operation from './Operation';
import { TestCaseDefinition } from './TestCaseDefinition';

export interface RunPlan {
  runId: string;
  specId: string;
  envName: string;
  operations: Operation[];
  testCaseDefinitions: TestCaseDefinition[];
  createdAt?: string;
}

export default RunPlan;
