import { Record } from 'immutable';
import { defaultId } from '../utils/generateId';
import { IListItem } from './IListItem';

const emptyItem: IListItem = {
  id: defaultId,
  text: '',
  isEdited: false,
};

export const ListItem: Record<string, any> = Record(emptyItem);
