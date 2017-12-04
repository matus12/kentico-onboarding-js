import { Collection } from 'immutable';
import { ListItem } from '../models/ListItem';

export interface IAppState {
  readonly todoList: {
    readonly items: Collection<string, ListItem>;
  };
}
