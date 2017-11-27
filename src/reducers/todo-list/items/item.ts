import {
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_INSERT,
  TODO_LIST_ITEM_EDIT,
  TODO_LIST_ITEM_CANCEL_EDIT,
} from '../../../constants/actionTypes';
import { ListItem } from '../../../models/ListItem';
import { IAction } from '../../../actions/IAction';
import { IListItem } from '../../../models/IListItem';

export const item = (previousState = new ListItem(), action: IAction): ListItem => {
  switch (action.type) {
    case TODO_LIST_ITEM_EDIT:
    case TODO_LIST_ITEM_CANCEL_EDIT: {
      const updatedItem: IListItem = {
        id: previousState.id,
        text: previousState.text,
        isEdited: !previousState.isEdited,
      };

      return previousState.with(updatedItem);
    }

    case TODO_LIST_ITEM_UPDATE: {
      const updatedItem: IListItem = {
        id: previousState.id,
        text: action.payload.text,
        isEdited: !previousState.isEdited,
      };

      return previousState.with(updatedItem);
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
