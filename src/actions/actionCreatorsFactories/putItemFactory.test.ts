import { putItemFactory } from './putItemFactory';
import { Uuid } from '../../utils/generateId';
import {
  ITEM_UPDATE_FAILED,
  ITEM_UPDATE_SUCCEEDED,
  TODO_LIST_ITEM_UPDATE
} from '../../constants/actionTypes';
import { OrderedMap } from 'immutable';
import { FetchStatus } from '../../models/FetchStatus';
import { IAppState } from '../../models/IAppState';
import { ListItem } from '../../models/ListItem';

const dispatch = jest.fn(input => input);
const errorId = 'a378ffaa-75fa-4117-a57b-84da0a3c9732';
const generateId = () => errorId;

beforeEach(() => {
  dispatch.mock.calls.length = 0;
});

describe('put item tests', () => {
  it('dispatches TODO_LIST_ITEM_UPDATE, ITEM_UPDATE_SUCCEEDED after successful PUT request', async done => {
    const updatedItem = {
      id: '9a0b391a-2a57-4be1-8179-7271b5e8cdc3',
      text: 'updatedText',
      isSynchronized: true,
    };
    const mockStore: IAppState = {
      todoList: {
        items: OrderedMap([
          [
            updatedItem.id,
            new ListItem(updatedItem)
          ]
        ])
      },
      error: OrderedMap([]),
      fetchStatus: new FetchStatus()
    };
    const axiosPut = (_data: { id: Uuid, text: string }) =>
      Promise.resolve({
        data: updatedItem,
        status: 200,
        statusText: 'OK',
        headers: undefined,
        config: {}
      });
    const putItem = putItemFactory({
      generateId,
      axiosPut
    });
    const updateItem = {
      type: TODO_LIST_ITEM_UPDATE,
      payload: updatedItem
    };
    const putSucceeded = {
      type: ITEM_UPDATE_SUCCEEDED,
      payload: {
        id: updatedItem.id
      }
    };

    putItem({
      id: updatedItem.id,
      text: updatedItem.text,
      isSynchronized: true
    })(dispatch, () => mockStore)
      .then(() => {
        expect(dispatch.mock.calls[0][0]).toEqual(updateItem);
        expect(dispatch.mock.calls[1][0]).toEqual(putSucceeded);
        done();
      })
      .catch(error => done.fail(new Error(error)));
  });

  it('dispatches TODO_LIST_ITEM_UPDATE, ITEM_UPDATE_FAILED after unsuccessful PUT request', async done => {
    const errorMessage = 'Bad Request';
    const updatedItem = {
      id: '9a0b391a-2a57-4be1-8179-7271b5e8cdc3',
      text: 'updatedText',
      isSynchronized: false,
    };
    const mockStore: IAppState = {
      todoList: {
        items: OrderedMap([
          [
            updatedItem.id,
            new ListItem(updatedItem)
          ]
        ])
      },
      error: OrderedMap([]),
      fetchStatus: new FetchStatus()
    };
    const axiosPut = (_data: { id: Uuid, text: string }) =>
      Promise.reject({
        response: {
          data: undefined,
          status: 200,
          statusText: errorMessage,
          headers: undefined,
          config: {}
        }
      });
    const putItem = putItemFactory({
      generateId,
      axiosPut
    });
    const updateItem = {
      type: TODO_LIST_ITEM_UPDATE,
      payload: updatedItem
    };
    const putFailed = {
      type: ITEM_UPDATE_FAILED,
      payload: {
        id: updatedItem.id,
        errorId: generateId(),
        message: errorMessage,
        backupText: updatedItem.text
      }
    };

    putItem(updatedItem)(dispatch, () => mockStore)
      .then(() => {
        expect(dispatch.mock.calls[0][0]).toEqual(updateItem);
        expect(dispatch.mock.calls[1][0]).toEqual(putFailed);
        done();
      })
      .catch(error => done.fail(new Error(error)));
  });
});
