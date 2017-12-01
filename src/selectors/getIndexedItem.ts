import * as memoize from 'memoizee';
import { IndexedItem } from '../models/IndexedItem';
import { IAppState } from '../reducers/IAppState';
import { uuId } from '../utils/generateId';
import { ListItem } from '../models/ListItem';

const createIndexedItem = (item: ListItem, index: number): IndexedItem =>
  new IndexedItem({
    index,
    id: item.id,
    text: item.text,
    isEdited: item.isEdited,
  });

const createIndexedItemMemoized = memoize(createIndexedItem);

export const getIndexedItem = (state: IAppState, index: number, id: uuId) => {
  const retrievedItem: ListItem = state.todoList.items.get(id);

  return createIndexedItemMemoized(retrievedItem, index);
};
