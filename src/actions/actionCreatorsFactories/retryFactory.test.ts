import { ListItem } from '../../models/ListItem';
import { retryFactory } from './retryFactory';

const dispatch = jest.fn(input => input);

beforeEach(() => {
  dispatch.mockReset();
});

describe('retryFactory action creator', () => {
  const postItem = jest.fn(input => input);
  const putItem = jest.fn(input => input);
  const deleteFromServer = jest.fn(input => input);
  const item = new ListItem({
    id: '389fca3f-bde5-4951-b427-28f0155c8857',
    text: 'some text',
    isEdited: false,
    isSynchronized: true,
    errorId: '389fca3f-bde5-4951-b427-28f0155c8857'
  });

  it('should dispatch postItem thunk action with correct arguments on ITEM_INSERT_FAILED', () => {
    const action = 'ITEM_INSERT_FAILED';
    const expectedValue = {
      id: item.id,
      text: item.text
    };

    retryFactory({
      postItem,
      putItem,
      deleteFromServer
    })(action, item)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(expectedValue);
  });

  it('should dispatch putItem thunk action with correct arguments on ITEM_UPDATE_FAILED', () => {
    const action = 'ITEM_UPDATE_FAILED';
    const expectedValue = {
      id: item.id,
      text: item.text,
      isSynchronized: true
    };

    retryFactory({
      postItem,
      putItem,
      deleteFromServer
    })(action, item)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(expectedValue);
  });

  it('should dispatch deleteFromServer thunk action with correct arguments on ITEM_DELETION_FAILED', () => {
    const action = 'ITEM_DELETION_FAILED';

    retryFactory({
      postItem,
      putItem,
      deleteFromServer
    })(action, item)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(item.id);
  });
});
