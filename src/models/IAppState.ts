import { Collection } from 'immutable';
import { ListItem } from './ListItem';

export interface IAppState {
  readonly todoList: {
    readonly items: Collection<string, ListItem>;
  };
}
