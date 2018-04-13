import * as actions from '../../../actions/actionCreators';
import {
  OrderedMap,
} from 'immutable';
import { items } from './items';
import { ListItem } from '../../../models/ListItem';
import { Uuid } from '../../../utils/generateId';
import { insertItem, postSucceeded } from '../../../actions/actionCreatorsFactories/postItemFactory';
import {
  putFailed,
  putSucceeded,
  updateItem
} from '../../../actions/actionCreatorsFactories/putItemFactory';
import {
  deletionFailed,
  deleteItem,
  deletionSucceeded
} from '../../../actions/actionCreatorsFactories/deleteItemFactory';

describe('items reducers', () => {
  const plainItem1 = {
    id: '16b1706c-1311-418d-aaaa-d6043f2e7f1f',
    text: 'Make a coffee',
    isEdited: false,
  };
  const plainItem2 = {
    id: '16b1706c-1311-418d-bdba-d6043f2e7f1f',
    text: 'Do these tests',
    isEdited: false,
  };
  const UNKNOWN_ACTION_DUPLICATE = 'UNKNOWN_ACTION_DUPLICATE';
  const unknownAction = {
    type: UNKNOWN_ACTION_DUPLICATE,
    payload: {
      item: plainItem2,
    },
  };
  const errorId = '16b1706c-1311-418d-FFFF-d6043f2e7f1f';

  it('should return empty ordered map when state is undefined', () => {
    const initialState = items(undefined, unknownAction);

    expect(initialState).toEqual(OrderedMap());
  });

  it('should add record to non-empty store on ITEM_CREATE action', () => {
    const singleItemState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
    ]);
    const expectedState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2),
      ],
    ]).toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      singleItemState,
      insertItem({
        text: plainItem2.text,
        id: plainItem2.id,
        isSynchronized: true
      }),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should update item\'s id after ITEM_INSERT_SUCCEEDED action', () => {
    const idFromServer = '4061431b-40b1-4c24-a99b-8dc505e879ed';
    const twoItemsState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2),
      ],
    ]);
    const expectedState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        idFromServer,
        new ListItem({
          ...plainItem1,
          id: idFromServer
        })
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2)
      ]
    ]).toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      twoItemsState,
      postSucceeded(
        idFromServer,
        {
          id: plainItem1.id,
          text: plainItem1.text,
          isSynchronized: true
        })
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should make item editable on ITEM_EDIT action', () => {
    const expectedState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem({
          ...plainItem1,
          isEdited: true,
        }),
      ],
    ]).toJS();
    const singleItemState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
    ]);

    const newState: OrderedMap<Uuid, ListItem> = items(
      singleItemState,
      actions.editItem(plainItem1.id),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should make item non-editable on ITEM_CANCEL_EDIT action', () => {
    const singleItemState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem({
          ...plainItem1,
          isEdited: true,
        }),
      ],
    ]);
    const expectedState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem({
          ...plainItem1,
          isEdited: false,
        }),
      ],
    ]).toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      singleItemState,
      actions.cancelItemEditing(plainItem1.id),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should delete record after ITEM_DELETION_SUCCEEDED action', () => {
    const twoItemsState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2),
      ],
    ]);
    const expectedState: OrderedMap<Uuid, ListItem> = twoItemsState.delete(plainItem1.id).toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      twoItemsState,
      deletionSucceeded(plainItem1.id),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should add nonempty errorId to item after ITEM_DELETION_FAILED action', () => {
    const errorMessage = 'this time it is really bad';
    const twoItemsState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2),
      ],
    ]);
    const expectedState: OrderedMap<Uuid, ListItem> = twoItemsState.update(
      plainItem1.id,
      () => new ListItem({
        ...plainItem1,
        errorId,
        isSynchronized: true,
      })
    ).toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      twoItemsState,
      deletionFailed(
        plainItem1.id,
        {
          errorId,
          message: errorMessage
        }
      ),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should set item to delete state after TODO_LIST_ITEM_DELETE action', () => {
    const singleItemState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1)
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2)
      ]
    ]);
    const itemBeingDeleted = new ListItem({
      ...plainItem1,
      isEdited: false,
      isSynchronized: false,
    });
    const expectedState: OrderedMap<Uuid, ListItem> = singleItemState.update(plainItem1.id, () => itemBeingDeleted);

    const newState: OrderedMap<Uuid, ListItem> = items(
      singleItemState,
      deleteItem(plainItem1.id)
    );

    expect(newState).toEqual(expectedState);
  });

  it('should update correct item after TODO_LIST_ITEM_UPDATE action', () => {
    const updatedText: string = 'updatedText';
    const twoItemsState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2),
      ],
    ]);
    const expectedState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem({
          ...plainItem1,
          text: updatedText,
          isEdited: false,
          isSynchronized: false,
          backupText: plainItem1.text
        }),
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2),
      ],
    ]).toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      twoItemsState,
      updateItem({
        id: plainItem1.id,
        text: updatedText,
        isSynchronized: false
      }),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should update correct item after ITEM_UPDATE_SUCCEEDED action accordingly', () => {
    const twoItemsState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2),
      ],
    ]);
    const expectedState: OrderedMap<Uuid, ListItem> = twoItemsState.update(
      plainItem2.id,
      () => new ListItem({
        ...plainItem2,
        isSynchronized: true,
      }));

    const newState: OrderedMap<Uuid, ListItem> = items(
      twoItemsState,
      putSucceeded(plainItem2.id)
    );

    expect(newState).toEqual(expectedState);
  });

  it('should revert item back after ITEM_UPDATE_FAILED action', () => {
    const errorMessage = 'something went really wrong';
    const backupText = 'some intelligent backup text';
    const twoItemsState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1)
      ],
      [
        plainItem2.id,
        new ListItem({
          errorId,
          ...plainItem2,
          backupText
        }),
      ],
    ]);
    const expectedState: OrderedMap<Uuid, ListItem> = twoItemsState.update(
      plainItem2.id,
      () => new ListItem({
        ...plainItem2,
        errorId,
        isSynchronized: true,
        backupText,
      })).toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      twoItemsState,
      putFailed(
        plainItem2.id,
        {
          errorId,
          message: errorMessage,
          backupText: 'bla'
        }
      )
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should delete item\'s error message after ITEM_ERROR_CLOSE action', () => {
    const twoItemsState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1)
      ],
      [
        plainItem2.id,
        new ListItem({
          ...plainItem2,
        }),
      ],
    ]);
    const expectedState: OrderedMap<Uuid, ListItem> = twoItemsState.update(
      plainItem2.id,
      () => new ListItem({
        ...plainItem2,
      })).toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      twoItemsState,
      actions.closeItemError(plainItem2.id, '123')
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should return prevState on unknown action', () => {
    const singleItemState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem({
          ...plainItem1,
          isEdited: true,
        }),
      ],
    ]);
    const expectedState: OrderedMap<Uuid, ListItem> = singleItemState.toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      singleItemState,
      unknownAction,
    ).toJS();

    expect(newState).toEqual(expectedState);
  });
});
