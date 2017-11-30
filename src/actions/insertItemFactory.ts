import { TODO_LIST_ITEM_INSERT } from '../constants/actionTypes';
import { IAction } from './IAction';
import { uuId } from '../utils/generateId';

export const insertItemFactory = (generateId: () => uuId) =>
  (text: string): IAction => ({
    type: TODO_LIST_ITEM_INSERT,
    payload: {
      id: generateId(),
      text,
    },
  });
