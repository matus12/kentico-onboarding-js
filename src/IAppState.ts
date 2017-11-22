import { Collection } from 'immutable';
import { ListItem } from './models/ListItem';

export interface IAppState {
  todoList: {
    items: Collection<string, ListItem>;
  };
}
