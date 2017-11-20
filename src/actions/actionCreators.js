import {
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_EDIT_START,
  TODO_LIST_ITEM_EDIT_END,
} from '../constants/actionTypes';
import { generateId } from '../utils/generateId';
import { insertItemFactory } from './insertItemFactory';

export const insertItem = insertItemFactory(generateId);

export const updateItem = (id, newText) => ({
  type: TODO_LIST_ITEM_UPDATE,
  payload: {
    id,
    newText,
  },
});

export const deleteItem = (id) => ({
  type: TODO_LIST_ITEM_DELETE,
  payload: {
    id,
  },
});

export const startEdit = (id) => ({
  type: TODO_LIST_ITEM_EDIT_START,
  payload: {
    id,
    isEdited: true,
  },
});

export const endEdit = (id) => ({
  type: TODO_LIST_ITEM_EDIT_END,
  payload: {
    id,
    isEdited: false,
  },
});
