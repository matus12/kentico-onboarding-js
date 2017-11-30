import { IndexedItem } from '../models/IndexedItem';
import { ListItem } from '../models/ListItem';

export const createIndexedItem = (item: ListItem, index: number): IndexedItem =>
  new IndexedItem({
    index,
    id: item.id,
    text: item.text,
    isEdited: item.isEdited,
  });
