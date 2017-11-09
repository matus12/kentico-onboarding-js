import * as types from '../src/constants/actionTypes';
import * as actions from '../src/actions/actionCreators';
import { OrderedMap, Record } from 'immutable';
import { items } from '../src/reducers/todoList/todoItem/items';
import { generateId } from '../src/utils/generateId';

describe('actions', () => {
  it('should create an action to add todo item', () => {
    const text = 'Make a coffee';
    const expectedAction = {
      type: types.TODO_LIST_ITEM_CREATE,
      payload: {
        id: generateId(),
        text,
        isEdited: false,
      },
    };
    expect(actions.insertItem(text).type).toEqual(expectedAction.type);
    expect(actions.insertItem(text).payload.text).toEqual(expectedAction.payload.text);
    expect(actions.insertItem(text).payload.isEdited).toEqual(expectedAction.payload.isEdited);
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

    expect(actions.updateItem(item)).toEqual(expectedAction);
  });

  it('should create an action to delete todo item', () => {
    const id = generateId();
    const expectedAction = {
      type: types.TODO_LIST_ITEM_DELETE,
      payload: {
        id,
      },
    };

    expect(actions.deleteItem(id)).toEqual(expectedAction);
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
  const MyRecord = (itm) => Record({
    id: itm.id,
    text: itm.text,
    isEdited: false,
  });

  it('should return the initial state', () => {
    expect(items(undefined, {})).toEqual(
      OrderedMap(),
    );
  });

  it('should handle ITEM_CREATE action', () => {
    const expectedItem = actions.insertItem(item.text);

    expect(items(
      undefined,
      expectedItem
    )).toEqual(
      OrderedMap([
        expectedItem.id,
        MyRecord(expectedItem),
      ])
    );
    expect(items(
      OrderedMap([
        item.id,
        MyRecord(item),
      ]),
      expectedItem
    )).toEqual(
      OrderedMap([
        [
          item.id,
          MyRecord(item),
        ],
        [
          expectedItem.id,
          MyRecord(expectedItem),
        ]])
    );
  });

  it('should handle ITEM_DELETE action', () => {
    expect(items(
      OrderedMap([
        item.id,
        MyRecord(item),
      ]),
      actions.deleteItem(item.id)
    )).toEqual(OrderedMap());
    expect(items(
      OrderedMap([
        [
          item.id,
          MyRecord(item),
        ],
        [
          item2.id,
          MyRecord(item2),
        ]]),
      actions.deleteItem(
        item.id)
    )).toEqual(
      OrderedMap([
        item2.id,
        MyRecord(item2),
      ])
    );
  });

  it('should handle ITEM_UPDATE action', () => {
    const updatedItem = {
      id: item.id,
      text: 'updatedText',
      isEdited: !item.isEdited,
    };

    expect(items(
      OrderedMap([
        item.id,
        MyRecord(item),
      ]),
      actions.updateItem(item)
    )).toEqual(
      OrderedMap([
        item.id,
        MyRecord(updatedItem),
      ])
    );
  });
});
