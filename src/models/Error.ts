import { defaultId, Uuid } from '../utils/generateId';
import { Base } from './Base';
import { emptyItem, IListItem } from './ListItem';

export const emptyError: IError = {
  id: defaultId,
  errorMessage: '',
  action: '',
  item: emptyItem
};

export interface IError {
  readonly id: Uuid;
  readonly errorMessage: string;
  readonly action: string;
  item: IListItem;
}

export class Error extends Base(emptyError) implements IError {
  readonly id: Uuid;
  readonly errorMessage: string;
  readonly action: string;
  readonly item: IListItem;
}
