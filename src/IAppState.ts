import { Collection } from 'immutable';
import { ListItem } from './models/ListItem';

export interface IAppState {
  list: {
    items: Collection<string, ListItem>;
  };
}
