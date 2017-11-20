import * as actions from '../../../../actions/actionCreators';
import { OrderedMap, Record } from 'immutable';
import { items } from './items';
import { insertItemFactory } from '../../../../actions/insertItemFactory';

describe('reducers', () => {
  const insertItem = insertItemFactory(() => '16b1706c-1311-418d-aaaa-d6043f2e7f1f');

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
  const expectedItemAction = insertItem(item.text);
  const expectedItemAction2 = insertItem(item2.text);
  const ItemRecord = Record({
    id: expectedItemAction.payload.id,
    text: item.text,
    isEdited: false,
  });
  const orderedMap = new OrderedMap([
    [expectedItemAction.payload.id,
      new ItemRecord()],
  ]);

  it('should return the initial state', () => {
    const noAction = items(undefined, {});

    expect(noAction).toEqual(OrderedMap());
  });

  it('should handle ITEM_CREATE action when state is empty', () => {
    const newState = items(
      undefined,
      expectedItemAction
    ).toJS();
    const expectedState = orderedMap.toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should add record to non-empty store on ITEM_CREATE action', () => {
    const newState = items(
      orderedMap,
      expectedItemAction2
    ).toJS();

    const expectedState = OrderedMap([
      [
        expectedItemAction.payload.id,
        new ItemRecord(),
      ],
      [
        expectedItemAction2.payload.id,
        new ItemRecord({
          id: expectedItemAction2.payload.id,
          text: item2.text,
          isEdited: false,
        }),
      ]]).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should leave state empty when deleting last item ITEM_DELETE action', () => {
    const newStateSize = items(
      orderedMap,
      actions.deleteItem(expectedItemAction.payload.id)
    ).size;

    expect(newStateSize).toBe(0);
  });

  it('should delete correct record after ITEM_DELETE action', () => {
    const newState = items(
      OrderedMap([
        [
          item.id,
          new ItemRecord({
            id: item.id,
            text: item.text,
            isEdited: item.isEdited,
          }),
        ],
        [
          item2.id,
          new ItemRecord({
            id: item2.id,
            text: item2.text,
            isEdited: item2.isEdited,
          }),
        ]]),
      actions.deleteItem(item.id))
      .toJS();
    const expectedState = OrderedMap([
      [
        item2.id,
        new ItemRecord({
          id: item2.id,
          text: item2.text,
          isEdited: item2.isEdited,
        }),
      ]]).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should update correct item after ITEM_UPDATE action', () => {
    const updatedItem = {
      id: item.id,
      text: 'updatedText',
      isEdited: item.isEdited,
    };
    const newState = items(
      OrderedMap([
        [
          item.id,
          new ItemRecord({
            id: item.id,
            text: item.text,
            isEdited: item.isEdited,
          }),
        ],
        [
          item2.id,
          new ItemRecord({
            id: item2.id,
            text: item2.text,
            isEdited: item2.isEdited,
          }),
        ],
      ]),
      actions.updateItem(item.id, 'updatedText')
    ).toJS();
    const expectedState = OrderedMap([
      [
        updatedItem.id,
        new ItemRecord({
          id: updatedItem.id,
          text: updatedItem.text,
          isEdited: updatedItem.isEdited,
        }),
      ],
      [
        item2.id,
        new ItemRecord({
          id: item2.id,
          text: item2.text,
          isEdited: item2.isEdited,
        }),
      ],
    ]).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should return prevState on unknown action', () => {
    const newState = items(
      orderedMap,
      {
        type: 'TODO_LIST_ITEM_DUPLICATE',
        payload: {
          item: item2,
        },
      }
    ).toJS();
    const expectedState = orderedMap.toJS();

    expect(newState).toEqual(expectedState);
  });
});
