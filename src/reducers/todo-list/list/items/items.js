import { OrderedMap } from 'immutable';
import {
  TODO_LIST_ITEM_INSERT,
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_EDIT_START,
  TODO_LIST_ITEM_EDIT_END,
} from '../../../../constants/actionTypes';
import { ListItem } from '../../../../models/ListItem';

export const items = (previousState = OrderedMap(), action) => {
  switch (action.type) {
    case TODO_LIST_ITEM_INSERT:
      return previousState.set(
        action.payload.id,
        new ListItem({
          id: action.payload.id,
          text: action.payload.text,
        }));

    case TODO_LIST_ITEM_DELETE:
      return previousState.delete(action.payload.id);

    case TODO_LIST_ITEM_UPDATE:
      return previousState.mergeIn(
        [action.payload.id, 'text'],
        action.payload.newText,
      );

    case TODO_LIST_ITEM_EDIT_START:
      return previousState.mergeIn(
        [action.payload.id, 'isEdited'],
        true,
      );
    case TODO_LIST_ITEM_EDIT_END:
      return previousState.mergeIn(
        [action.payload.id, 'isEdited'],
        false,
      );

    default:
      return previousState;
  }
};
