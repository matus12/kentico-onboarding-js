import { TODO_LIST_ITEM_CREATE } from '../constants/actionTypes';

export const insertItemFactory = generateId =>
  text => ({
    type: TODO_LIST_ITEM_CREATE,
    payload: {
      id: generateId(),
      text,
      isEdited: false,
    },
  });
