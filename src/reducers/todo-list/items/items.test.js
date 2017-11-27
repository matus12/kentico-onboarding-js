import * as actions from '../../../actions/actionCreators';
import {
  OrderedMap,
} from 'immutable';
import { items } from './items';
import { insertItemFactory } from '../../../actions/insertItemFactory';
import { ListItem } from '../../../models/ListItem';

describe('reducers', () => {
  const item = {
    id: '16b1706c-1311-418d-aaaa-d6043f2e7f1f',
    text: 'Make a coffee',
    isEdited: false,
  };
  const item2 = {
    id: '16b1706c-1311-418d-bdba-d6043f2e7f1f',
    text: 'Do these tests',
    isEdited: false,
  };

  const insertItem = id => insertItemFactory(() => id);

  it('should return the initial state', () => {
    const noAction = items(undefined, {});

    expect(noAction).toEqual(OrderedMap());
  });

  it('should add record to non-empty store on ITEM_CREATE action', () => {
    const singleItemState = new OrderedMap([
      [
        item.id,
        new ListItem(item),
      ],
    ]);
    const expectedState = new OrderedMap([
      [
        item.id,
        new ListItem({
          id: item.id,
          text: item.text,
          isEdited: item.isEdited,
        }),
      ],
      [
        item2.id,
        new ListItem({
          id: item2.id,
          text: item2.text,
          isEdited: item2.isEdited,
        }),
      ],
    ]).toJS();
    const insertItemAction = insertItem(item2.id);

    const newState = items(
      singleItemState,
      insertItemAction(item2.text),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should make item editable on ITEM_EDIT action', () => {
    const expectedState = new OrderedMap([
      [
        item.id,
        new ListItem({
          id: item.id,
          text: item.text,
          isEdited: true,
        }),
      ],
    ]).toJS();
    const singleItemState = new OrderedMap([
      [
        item.id,
        new ListItem(item),
      ],
    ]);

    const newState = items(
      singleItemState,
      actions.editItem(item.id))
      .toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should make item non-editable on ITEM_CANCEL_EDIT action', () => {
    const singleItemState = new OrderedMap([
      [
        item.id,
        new ListItem({
          id: item.id,
          text: item.text,
          isEdited: true,
        }),
      ],
    ]);
    const expectedState = new OrderedMap([
      [
        item.id,
        new ListItem({
          id: item.id,
          text: item.text,
          isEdited: false,
        }),
      ],
    ]).toJS();

    const newState = items(
      singleItemState,
      actions.cancelItemEditing(item.id))
      .toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should delete record after ITEM_DELETE action', () => {
    const twoItemsState = new OrderedMap([
      [
        item.id,
        new ListItem({
          id: item.id,
          text: item.text,
          isEdited: item.isEdited,
        }),
      ],
      [
        item2.id,
        new ListItem({
          id: item2.id,
          text: item2.text,
          isEdited: item2.isEdited,
        }),
      ],
    ]);
    const expectedState = twoItemsState.delete(item.id).toJS();

    const newState = items(
      twoItemsState,
      actions.deleteItem(item.id))
      .toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should update correct item after ITEM_UPDATE action', () => {
    const updatedItem = {
      id: item.id,
      text: 'updatedText',
      isEdited: !item.isEdited,
    };
    const twoItemsState = new OrderedMap([
      [
        item.id,
        new ListItem({
          id: item.id,
          text: item.text,
          isEdited: item.isEdited,
        }),
      ],
      [
        item2.id,
        new ListItem({
          id: item2.id,
          text: item2.text,
          isEdited: item2.isEdited,
        }),
      ],
    ]);
    const expectedState = OrderedMap([
      [
        updatedItem.id,
        new ListItem(updatedItem),
      ],
      [
        item2.id,
        new ListItem({
          id: item2.id,
          text: item2.text,
          isEdited: item2.isEdited,
        }),
      ],
    ]).toJS();

    const newState = items(
      twoItemsState,
      actions.updateItem(item.id, 'updatedText'),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should return prevState on unknown action', () => {
    const UNKNOWN_ACTION_DUPLICATE = 'UNKNOWN_ACTION_DUPLICATE';
    const unknownAction = {
      type: UNKNOWN_ACTION_DUPLICATE,
      payload: {
        item: item2,
      },
    };
    const singleItemState = new OrderedMap([
      [
        item.id,
        new ListItem({
          id: item.id,
          text: item.text,
          isEdited: true,
        }),
      ],
    ]);
    const expectedState = singleItemState.toJS();

    const newState = items(
      singleItemState,
      unknownAction,
    ).toJS();

    expect(newState).toEqual(expectedState);
  });
});
