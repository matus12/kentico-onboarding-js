import {
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_INSERT,
  TODO_LIST_ITEM_TOGGLE,
} from '../../../../constants/actionTypes';
import { ListItem } from '../../../../models/ListItem';

export const item = (previousState = ListItem(), action) => {
  switch (action.type) {
    case TODO_LIST_ITEM_TOGGLE:
      return previousState.setIn(
        ['isEdited'],
        action.payload.isEdited,
      );

    case TODO_LIST_ITEM_UPDATE: {
      const updatedItem = {
        text: action.payload.text,
        isEdited: false,
      };

      return previousState.merge(
        updatedItem,
      );
    }

    case TODO_LIST_ITEM_INSERT:
      return new ListItem({
        id: action.payload.id,
        text: action.payload.text,
      });

    default:
      return previousState;
  }
};
