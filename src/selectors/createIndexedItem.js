import { IndexedItem } from '../models/IndexedItem';

export const createIndexedItem = (item, index) =>
  new IndexedItem({
    index,
    id: item.id,
    text: item.text,
    isEdited: item.isEdited,
  });
