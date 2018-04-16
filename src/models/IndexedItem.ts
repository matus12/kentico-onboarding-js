import { defaultId, Uuid } from '../utils/generateId';
import { Base } from './Base';

const emptyIndexedItem: IIndexedItem = {
  index: 0,
  id: defaultId,
  text: '',
  isEdited: false,
  isSynchronized: false,
  errorId: null
};

export interface IIndexedItem {
  readonly index: number;
  readonly id: Uuid;
  readonly text: string;
  readonly isEdited: boolean;
  readonly isSynchronized: boolean;
  readonly errorId: Uuid | null;
}

export class IndexedItem extends Base(emptyIndexedItem) implements IIndexedItem {
  readonly index: number;
  readonly id: Uuid;
  readonly text: string;
  readonly isEdited: boolean;
  readonly isSynchronized: boolean;
  readonly errorId: Uuid;
}
