import { Record } from 'immutable';
import { ListItem } from './ListItem';

const indexedItem = {
  index: null,
  payload: ListItem(),
};

export const IndexedItem = Record(indexedItem);
