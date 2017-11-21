import {
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_TOGGLE,
} from '../constants/actionTypes';
import { generateId } from '../utils/generateId';
import { insertItemFactory } from './insertItemFactory';

export const insertItem = insertItemFactory(generateId);

export const updateItem = (id, text) => ({
  type: TODO_LIST_ITEM_UPDATE,
  payload: {
    id,
    text,
  },
});

export const deleteItem = (id) => ({
  type: TODO_LIST_ITEM_DELETE,
  payload: {
    id,
  },
});

export const toggleItem = (id, isEdited) => ({
  type: TODO_LIST_ITEM_TOGGLE,
  payload: {
    id,
    isEdited,
  },
});
