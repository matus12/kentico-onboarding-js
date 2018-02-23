import { putItemFactory } from './putItemFactory';
import { Uuid } from '../../utils/generateId';

describe('put item tests', () => {
  const updateItem = jest.fn();
  const putSuccess = jest.fn();
  const putError = jest.fn();
  const dispatch = jest.fn(input => input);

  it('creates ITEM_PUT_SUCCESS after successful PUT request', (done) => {
    putSuccess.mock.calls.length = 0;
    const updatedItem = {
      id: '9a0b391a-2a57-4be1-8179-7271b5e8cdc3',
      text: 'updatedText',
    };
    const put = (_url: string,
                 {
                   _id,
                   _text
                 }: { _id: Uuid, _text: string }) =>
      Promise.resolve({data: updateItem});
    const putItem = putItemFactory({
      updateItem,
      putSuccess,
      putError,
      getAxios: ({
        axios: {
          put
        },
        url: 'fake_url'
      })
    });

    putItem({id: updatedItem.id, text: updatedItem.text})(dispatch)
      .then(() => {
        expect(putSuccess.mock.calls.length).toEqual(1);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates ITEM_PUT_SUCCESS with correct arguments after successful PUT request', (done) => {
    putSuccess.mock.calls.length = 0;
    const updatedItem = {
      id: '9a0b391a-2a57-4be1-8179-7271b5e8cdc3',
      text: 'updatedText',
    };
    const put = (_url: string,
                 {
                   _id,
                   _text
                 }: { _id: Uuid, _text: string }) =>
      Promise.resolve({data: updatedItem});
    const putItem = putItemFactory({
      updateItem,
      putSuccess,
      putError,
      getAxios: ({
        axios: {
          put
        },
        url: 'fake_url'
      })
    });

    putItem({id: updatedItem.id, text: updatedItem.text})(dispatch)
      .then(() => {
        expect(putSuccess.mock.calls[0][0]).toEqual(updatedItem.id);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates ITEM_PUT_ERROR after unsuccessful PUT request', (done) => {
    putError.mock.calls.length = 0;
    const errorMessage = 'Bad Request';
    const updatedItem = {
      id: '9a0b391a-2a57-4be1-8179-7271b5e8cdc3',
      text: 'updatedText',
    };
    const put = (_url: string,
                 {
                   _id,
                   _text
                 }: { _id: Uuid, _text: string }) =>
      Promise.reject({
        response: {
          status: 400,
          statusText: errorMessage,
        }
      });
    const putItem = putItemFactory({
      updateItem,
      putSuccess,
      putError,
      getAxios: ({
        axios: {
          put
        },
        url: 'fake_url'
      })
    });

    putItem({id: updatedItem.id, text: updatedItem.text})(dispatch)
      .then(() => {
        expect(putError.mock.calls.length).toEqual(1);
        expect(putError.mock.calls[0][0]).toEqual({
          id: updatedItem.id,
          message: errorMessage
        });
        done();
      })
      .catch(err => console.log(err));
  });
});
