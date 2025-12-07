import AppError from './AppError';

export class ValidationError extends AppError {
  public details?: any;
  constructor(message: string, details?: any) {
    super(message, 400);
    this.details = details;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export default ValidationError;
