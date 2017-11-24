import { Record } from 'immutable';
import { defaultId } from '../utils/generateId';
import { IIndexedItem } from './IIndexedItem';

const emptyIndexedItem: IIndexedItem = {
  index: null,
  id: defaultId,
  text: '',
  isEdited: false,
};

export const IndexedItem = Record(emptyIndexedItem);
