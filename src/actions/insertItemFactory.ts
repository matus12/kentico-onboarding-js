import { TODO_LIST_ITEM_INSERT } from '../constants/actionTypes';
import { IAction } from './IAction';

export const insertItemFactory = (generateId: () => string) =>
  (text: string): IAction => ({
    type: TODO_LIST_ITEM_INSERT,
    payload: {
      id: generateId(),
      text,
    },
  });
