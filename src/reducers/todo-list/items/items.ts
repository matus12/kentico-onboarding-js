import { OrderedMap } from 'immutable';
import {
  TODO_LIST_ITEM_INSERT,
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_CANCEL_EDIT,
  TODO_LIST_ITEM_EDIT,
} from '../../../constants/actionTypes';
import { item } from './item';
import { IAction } from '../../../actions/IAction';
import { ListItem } from '../../../models/ListItem';

export const items = (previousState: OrderedMap<string, ListItem> = OrderedMap<string, ListItem>(), action: IAction): OrderedMap<string, ListItem> => {
  switch (action.type) {
    case TODO_LIST_ITEM_DELETE:
      return previousState.delete(action.payload.id);

    case TODO_LIST_ITEM_INSERT:
    case TODO_LIST_ITEM_UPDATE:
    case TODO_LIST_ITEM_EDIT:
    case TODO_LIST_ITEM_CANCEL_EDIT: {
      const existingItem: ListItem = previousState.get(action.payload.id);
      const updatedItem: ListItem = item(existingItem, action);

      return previousState.set(
        updatedItem.id,
        updatedItem,
      );
    }

    default:
      return previousState;
  }
};
