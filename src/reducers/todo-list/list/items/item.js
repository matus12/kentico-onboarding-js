import {
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_EDIT_START,
  TODO_LIST_ITEM_EDIT_END,
  TODO_LIST_ITEM_INSERT,
} from '../../../../constants/actionTypes';
import { ListItem } from '../../../../models/ListItem';

export const item = (previousState = ListItem(), action) => {
  switch (action.type) {
    case TODO_LIST_ITEM_EDIT_START:
      return previousState.setIn(
        ['isEdited'],
        true,
      );

    case TODO_LIST_ITEM_EDIT_END:
      return previousState.setIn(
        ['isEdited'],
        false,
      );

    case TODO_LIST_ITEM_UPDATE:
      return previousState.setIn(
        ['text'],
        action.payload.newText,
      );

    case TODO_LIST_ITEM_INSERT:
      return new ListItem({
        id: action.payload.id,
        text: action.payload.text,
      });

    default:
      return previousState;
  }
};
