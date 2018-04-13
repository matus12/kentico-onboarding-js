import { defaultId, Uuid } from '../utils/generateId';
import { Base } from './Base';

export const emptyError: IError = {
  id: defaultId,
  errorMessage: '',
  action: '',
  backupText: ''
};

export interface IError {
  readonly id: Uuid;
  readonly errorMessage: string;
  readonly action: string;
  readonly backupText: string;
}

export class Error extends Base(emptyError) implements IError {
  readonly id: Uuid;
  readonly errorMessage: string;
  readonly action: string;
  readonly backupText: string;
}
