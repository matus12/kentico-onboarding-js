import { Base } from './Base';

const emptyStatus: IFetchStatus = {
  isFetching: false,
  hasError: false,
  errorMessage: ''
};

export interface IFetchStatus {
  readonly isFetching: boolean;
  readonly hasError: boolean;
  readonly errorMessage: string;
}

export class FetchStatus extends Base(emptyStatus) implements IFetchStatus {
  readonly isFetching: boolean;
  readonly hasError: boolean;
  readonly errorMessage: string;
}
