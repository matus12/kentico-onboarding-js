import * as actions from '../../../actions/actionCreators';
import {
  OrderedMap,
} from 'immutable';
import { items } from './items';
import { insertItemFactory } from '../../../actions/insertItemFactory';
import { ListItem } from '../../../models/ListItem';

describe('reducers', () => {
  const item: ListItem = new ListItem({
    id: '16b1706c-1311-418d-aaaa-d6043f2e7f1f',
    text: 'Make a coffee',
    isEdited: false,
  });
  const item2: ListItem = new ListItem({
    id: '16b1706c-1311-418d-bdba-d6043f2e7f1f',
    text: 'Do these tests',
    isEdited: false,
  });
  const UNKNOWN_ACTION_DUPLICATE = 'UNKNOWN_ACTION_DUPLICATE';
  const unknownAction = {
    type: UNKNOWN_ACTION_DUPLICATE,
    payload: {
      item: item2,
    },
  };

  const insertItem = (id: string) => insertItemFactory(() => id);

  it('should return the initial state', () => {
    const noAction = items(undefined, unknownAction);

    expect(noAction).toEqual(OrderedMap());
  });


  it('should add record to non-empty store on ITEM_CREATE action', () => {
    const singleItemState: OrderedMap<string, ListItem> = OrderedMap([
      [
        item.id,
        new ListItem(item),
      ],
    ]);
    const expectedState: OrderedMap<string, ListItem> = OrderedMap([
      [
        item.id,
        new ListItem(item),
      ],
      [
        item2.id,
        new ListItem(item2),
      ],
    ]).toJS();
    const insertItemAction = insertItem(item2.id);

    const newState: OrderedMap<string, ListItem> = items(
      singleItemState,
      insertItemAction(item2.text),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should make item editable on ITEM_EDIT action', () => {
    const expectedState: OrderedMap<string, ListItem> = OrderedMap([
      [
        item.id,
        new ListItem({
          ...item,
          isEdited: true,
        }),
      ],
    ]).toJS();
    const singleItemState: OrderedMap<string, ListItem> = OrderedMap([
      [
        item.id,
        new ListItem(item),
      ],
    ]);

    const newState: OrderedMap<string, ListItem> = items(
      singleItemState,
      actions.editItem(item.id),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should make item non-editable on ITEM_CANCEL_EDIT action', () => {
    const singleItemState: OrderedMap<string, ListItem> = OrderedMap([
      [
        item.id,
        new ListItem({
          ...item,
          isEdited: true,
        }),
      ],
    ]);
    const expectedState: OrderedMap<string, ListItem> = OrderedMap([
      [
        item.id,
        new ListItem({
          ...item,
          isEdited: false,
        }),
      ],
    ]).toJS();

    const newState: OrderedMap<string, ListItem> = items(
      singleItemState,
      actions.cancelItemEditing(item.id),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should delete record after ITEM_DELETE action', () => {
    const twoItemsState: OrderedMap<string, ListItem> = OrderedMap([
      [
        item.id,
        new ListItem(item),
      ],
      [
        item2.id,
        new ListItem(item2),
      ],
    ]);
    const expectedState: OrderedMap<string, ListItem> = twoItemsState.delete(item.id).toJS();

    const newState: OrderedMap<string, ListItem> = items(
      twoItemsState,
      actions.deleteItem(item.id),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should update correct item after ITEM_UPDATE action', () => {
    const updatedItem: ListItem = new ListItem({
      id: item.id,
      text: 'updatedText',
      isEdited: !item.isEdited,
    });
    const twoItemsState: OrderedMap<string, ListItem> = OrderedMap([
      [
        item.id,
        new ListItem(item),
      ],
      [
        item2.id,
        new ListItem(item2),
      ],
    ]);
    const expectedState: OrderedMap<string, ListItem> = OrderedMap([
      [
        updatedItem.id,
        new ListItem(updatedItem),
      ],
      [
        item2.id,
        new ListItem(item2),
      ],
    ]).toJS();

    const newState: OrderedMap<string, ListItem> = items(
      twoItemsState,
      actions.updateItem(item.id, 'updatedText'),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should return prevState on unknown action', () => {
    const singleItemState: OrderedMap<string, ListItem> = OrderedMap([
      [
        item.id,
        new ListItem({
          ...item,
          isEdited: true,
        }),
      ],
    ]);
    const expectedState: OrderedMap<string, ListItem> = singleItemState.toJS();

    const newState: OrderedMap<string, ListItem> = items(
      singleItemState,
      unknownAction,
    ).toJS();

    expect(newState).toEqual(expectedState);
  });
});
