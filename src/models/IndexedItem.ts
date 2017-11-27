import { Record } from 'immutable';
import { defaultId } from '../utils/generateId';
import { IIndexedItem } from './IIndexedItem';

const emptyIndexedItem: IIndexedItem = {
  index: null,
  id: defaultId,
  text: '',
  isEdited: false,
};

export class IndexedItem extends Record(emptyIndexedItem) implements IIndexedItem {
  index: number | null;
  id: string;
  text: string;
  isEdited: boolean;

  constructor(params?: IIndexedItem) {
    params ? super(params) : super();
  }
}
