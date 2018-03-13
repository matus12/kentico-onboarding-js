import { Record } from 'immutable';
import { IPostStatus } from './IPostStatus';

const emptyStatus: IPostStatus = {
  hasError: false,
  message: '',
  text: ''
};

export class PostStatus extends Record(emptyStatus) implements IPostStatus {
  hasError: boolean;
  message: string;
  text: string;

  constructor(params?: Partial<IPostStatus>) {
    params ? super(params) : super();
  }

  with(values: Partial<IPostStatus>) {
    return this.merge(values) as this;
  }
}
