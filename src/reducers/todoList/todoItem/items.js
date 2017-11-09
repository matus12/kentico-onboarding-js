import { OrderedMap } from 'immutable';
import { ItemRecord } from '../../../utils/itemRecord';
import {
  TODO_LIST_ITEM_CREATE,
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
} from '../../../constants/actionTypes';

export const items = (previousState = OrderedMap(), action) => {
  switch (action.type) {
    case TODO_LIST_ITEM_CREATE:
      return previousState.set(
        action.payload.id,
        new ItemRecord({
          id: action.payload.id,
          text: action.payload.text,
        }));

    case TODO_LIST_ITEM_DELETE:
      return previousState.delete(action.payload.id);

    case TODO_LIST_ITEM_UPDATE:
      return previousState.set(
        action.payload.item.id,
        action.payload.item
      );

    default:
      return previousState;
  }
};
