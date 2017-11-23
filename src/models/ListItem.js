import { Record } from 'immutable';
import { defaultId } from '../utils/generateId';

const emptyItem = {
  id: defaultId,
  text: '',
  isEdited: false,
};

export const ListItem = Record(emptyItem);
