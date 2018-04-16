import { deleteItemFactory } from './deleteItemFactory';
import { OPERATION_FAILED } from '../../constants/connection';
import {
  ITEM_DELETION_FAILED,
  ITEM_DELETION_SUCCEEDED,
  TODO_LIST_ITEM_DELETE
} from '../../constants/actionTypes';
import { ListItem } from '../../models/ListItem';
import { FetchStatus } from '../../models/FetchStatus';
import { IAppState } from '../../models/IAppState';
import { OrderedMap } from 'immutable';

const dispatch = jest.fn(input => input);
const id = 'a378ffaa-75fa-4117-a57b-84da0a3c975a';
const errorId = 'a378ffaa-75fa-4117-a57b-84da0a3c9732';
const generateId = () => errorId;

beforeEach(() => {
  dispatch.mock.calls.length = 0;
});

describe('delete item tests', () => {
  it('dispatches TODO_LIST_ITEM_DELETE, ITEM_DELETION_SUCCEEDED after successful DELETE request', async done => {
    const axiosDelete = (_id: string) =>
      Promise.resolve({
        data: undefined,
        status: 204,
        statusText: 'No Content',
        headers: undefined,
        config: {}
      });
    const itemToDelete = {
      id,
      text: 'abc'
    };
    const mockStore: IAppState = {
      todoList: {
        items: OrderedMap([
          [
            itemToDelete.id,
            new ListItem(itemToDelete)
          ]
        ])
      },
      error: OrderedMap([]),
      fetchStatus: new FetchStatus()
    };
    const deleteFromServer = deleteItemFactory({
      generateId,
      axiosDelete
    });
    const deleteItem = {
      type: TODO_LIST_ITEM_DELETE,
      payload: {
        id
      }
    };
    const deletionSucceeded = {
      type: ITEM_DELETION_SUCCEEDED,
      payload: {
        id
      }
    };

    deleteFromServer(id)(dispatch, () => mockStore)
      .then(() => {
        expect(dispatch.mock.calls[0][0]).toEqual(deleteItem);
        expect(dispatch.mock.calls[1][0]).toEqual(deletionSucceeded);
        done();
      })
      .catch(error => done.fail(new Error(error)));
  });

  it('dispatches TODO_LIST_ITEM_DELETE, ITEM_DELETION_FAILED after unsuccessful DELETE request', async done => {
    const axiosDelete = (_id: string) =>
      Promise.reject({
        response: {
          data: undefined,
          status: 404,
          statusText: 'Not Found',
          headers: undefined,
          config: {},
        },
      });
    const itemToDelete = {
      id,
      text: 'abc'
    };
    const mockStore: IAppState = {
      todoList: {
        items: OrderedMap([
          [
            itemToDelete.id,
            new ListItem(itemToDelete)
          ]
        ])
      },
      error: OrderedMap([]),
      fetchStatus: new FetchStatus()
    };
    const deleteFromServer = deleteItemFactory({
      generateId,
      axiosDelete
    });
    const deleteItem = {
      type: TODO_LIST_ITEM_DELETE,
      payload: {
        id
      }
    };
    const deletionFailed = {
      type: ITEM_DELETION_FAILED,
      payload: {
        id,
        errorId: generateId(),
        message: OPERATION_FAILED
      }
    };

    deleteFromServer(id)(dispatch, () => mockStore)
      .then(() => {
        expect(dispatch.mock.calls[0][0]).toEqual(deleteItem);
        expect(dispatch.mock.calls[1][0]).toEqual(deletionFailed);
        done();
      })
      .catch(error => done.fail(new Error(error)));
  });
});
