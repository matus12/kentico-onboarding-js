import {
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_INSERT,
  TODO_LIST_ITEM_EDIT,
  TODO_LIST_ITEM_CANCEL_EDIT,
} from '../../../constants/actionTypes';
import { ListItem } from '../../../models/ListItem';
import { IAction } from '../../../actions/IAction';

export const item = (previousState = new ListItem(), action: IAction) => {
  switch (action.type) {
    case TODO_LIST_ITEM_EDIT:
    case TODO_LIST_ITEM_CANCEL_EDIT: {
      return previousState.merge({
        isEdited: !previousState.isEdited,
      });
    }

    case TODO_LIST_ITEM_UPDATE: {
      const updatedItem = {
        text: action.payload.text,
        isEdited: !previousState.isEdited,
      };

      return previousState.merge(
        updatedItem,
      );
    }

    case TODO_LIST_ITEM_INSERT:
      return new ListItem({
        id: action.payload.id,
        text: action.payload.text,
        isEdited: false,
      });

    default:
      return previousState;
  }
};