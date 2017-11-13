import * as types from '../../../../src/constants/actionTypes';
import * as actions from '../../../../src/actions/actionCreators';
import { OrderedMap, Record } from 'immutable';
import { items } from '../../../../src/reducers/todoList/todoItem/items';
import { generateId } from '../../../../src/utils/generateId';

describe('actions', () => {
  it('should create an action to add item', () => {
    const text = 'Make a coffee';
    const id = generateId();
    const expectedAction = {
      type: types.TODO_LIST_ITEM_CREATE,
      payload: {
        id,
        text,
        isEdited: false,
      },
    };

    const action = actions.insertItemFactory(id)(text);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to update todo item', () => {
    const item = {
      id: generateId(),
      text: 'Make a coffee',
      isEdited: false,
    };
    const expectedAction = {
      type: types.TODO_LIST_ITEM_UPDATE,
      payload: {
        item,
      },
    };

    const updateItemAction = actions.updateItem(item);

    expect(updateItemAction).toEqual(expectedAction);
  });

  it('should create an action to delete todo item', () => {
    const id = generateId();
    const expectedAction = {
      type: types.TODO_LIST_ITEM_DELETE,
      payload: {
        id,
      },
    };

    const deleteItemAction = actions.deleteItem(id);

    expect(deleteItemAction).toEqual(expectedAction);
  });
});

describe('reducers', () => {
  const item = {
    id: generateId(),
    text: 'Make a coffee',
    isEdited: false,
  };
  const item2 = {
    id: generateId(),
    text: 'Do these tests',
    isEdited: false,
  };
  const expectedItemAction = actions.insertItem(item.text);
  const expectedItemAction2 = actions.insertItem(item2.text);
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
      actions.updateItem(item, 'updatedText')
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
