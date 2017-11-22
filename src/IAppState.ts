import { Collection } from 'immutable';
import { IListItem } from './models/IListItem';

export interface IAppState {
  list: {
    items: Collection<string, IListItem>;
  };
}
