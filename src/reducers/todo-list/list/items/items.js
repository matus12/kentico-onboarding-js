import { OrderedMap } from 'immutable';
import {
  TODO_LIST_ITEM_INSERT,
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_EDIT_START,
  TODO_LIST_ITEM_EDIT_END,
} from '../../../../constants/actionTypes';
import { item } from './item';

export const items = (previousState = OrderedMap(), action) => {
  switch (action.type) {
    case TODO_LIST_ITEM_INSERT: {
      const newItem = item(undefined, action);
      return previousState.set(
        newItem.id,
        newItem);
    }

    case TODO_LIST_ITEM_DELETE:
      return previousState.delete(action.payload.id);

    case TODO_LIST_ITEM_UPDATE:
      return previousState.set(
        action.payload.id,
        item(previousState.get(action.payload.id), action),
      );

    case TODO_LIST_ITEM_EDIT_START:
      return previousState.set(
        action.payload.id,
        item(previousState.get(action.payload.id), action),
      );

    case TODO_LIST_ITEM_EDIT_END:
      return previousState.set(
        action.payload.id,
        item(previousState.get(action.payload.id), action),
      );

    default:
      return previousState;
  }
};
