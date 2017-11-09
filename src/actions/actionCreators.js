import {
  TODO_LIST_ITEM_CREATE,
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
} from '../constants/actionTypes';
import { generateId } from '../utils/generateId';

export const insertItem = (text) => ({
  type: TODO_LIST_ITEM_CREATE,
  payload: {
    id: generateId(),
    text,
    isEdited: false,
  },
});

export const updateItem = (item) => ({
  type: TODO_LIST_ITEM_UPDATE,
  payload: {
    item,
  },
});

export const deleteItem = (id) => ({
  type: TODO_LIST_ITEM_DELETE,
  payload: {
    id,
  },
});
