import * as actions from '../../../actions/actionCreators';
import { UNKOWN_ACTION_DUPLICATE } from '../../../constants/actionTypes';
import {
  OrderedMap,
} from 'immutable';
import { items } from './items';
import { insertItemFactory } from '../../../actions/insertItemFactory';
import { ListItem } from '../../../models/ListItem';

describe('reducers', () => {
  const itemId = '16b1706c-1311-418d-aaaa-d6043f2e7f1f';
  const item2Id = '16b1706c-1311-418d-bdba-d6043f2e7f1f';
  const itemText = 'Make a coffee';
  const item2Text = 'Do these tests';

  const item = {
    id: itemId,
    text: itemText,
    isEdited: false,
  };
  const item2 = {
    id: item2Id,
    text: item2Text,
    isEdited: false,
  };

  const insertItem = insertItemFactory(() => itemId);
  const insertItem2 = insertItemFactory(() => item2Id);

  const insertItemAction = insertItem(item.text);
  const insertItem2Action = insertItem2(item2.text);
  const onlyItemState = new OrderedMap([
    [
      itemId,
      new ListItem(item),
    ],
  ]);
  const onlyItem2State = new OrderedMap([
    [
      item2Id,
      new ListItem(item2),
    ],
  ]);
  const twoItemState = new OrderedMap([
    [
      itemId,
      new ListItem(item),
    ],
    [
      item2Id,
      new ListItem(item2),
    ],
  ]);

  it('should return the initial state', () => {
    const noAction = items(undefined, {});

    expect(noAction).toEqual(OrderedMap());
  });

  it('should add record to non-empty store on ITEM_CREATE action', () => {
    const expectedState = twoItemState.toJS();

    const newState = items(
      onlyItemState,
      insertItem2Action,
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should delete correct record after ITEM_DELETE action', () => {
    const expectedState = onlyItem2State.toJS();

    const newState = items(
      twoItemState,
      actions.deleteItem(item.id))
      .toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should update correct item after ITEM_UPDATE action', () => {
    const updatedItem = {
      id: item.id,
      text: 'updatedText',
      isEdited: item.isEdited,
    };
    const expectedState = OrderedMap([
      [
        updatedItem.id,
        new ListItem(updatedItem),
      ],
      [
        item2.id,
        new ListItem(item2),
      ],
    ]).toJS();

    const newState = items(
      twoItemState,
      actions.updateItem(item.id, 'updatedText'),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should return prevState on unknown action', () => {
    const unknownAction = {
      type: UNKOWN_ACTION_DUPLICATE,
      payload: {
        item: item2,
      },
    };
    const expectedState = onlyItemState.toJS();

    const newState = items(
      onlyItemState,
      unknownAction,
    ).toJS();

    expect(newState).toEqual(expectedState);
  });
});
