import { Record } from 'immutable';
import { IListItem } from './IItem';
import { defaultId } from '../utils/generateId';

const emptyItem: IListItem = {
  id: defaultId,
  text: '',
  isEdited: false,
};

export const ListItem: Record<string, any> = Record(emptyItem);
