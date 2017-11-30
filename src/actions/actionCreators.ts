import {
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_EDIT,
  TODO_LIST_ITEM_CANCEL_EDIT,
} from '../constants/actionTypes';
import { generateId } from '../utils/generateId';
import { insertItemFactory } from './insertItemFactory';
import { IAction } from './IAction';

export const insertItem = insertItemFactory(generateId);

export const updateItem = (id: string, text: string): IAction => ({
  type: TODO_LIST_ITEM_UPDATE,
  payload: {
    id,
    text,
  },
});

export const deleteItem = (id: string): IAction => ({
  type: TODO_LIST_ITEM_DELETE,
  payload: {
    id,
  },
});

export const editItem = (id: string): IAction => ({
  type: TODO_LIST_ITEM_EDIT,
  payload: {
    id,
  },
});

export const cancelItemEditing = (id: string): IAction => ({
  type: TODO_LIST_ITEM_CANCEL_EDIT,
  payload: {
    id,
  },
});
