import { OrderedMap, Record } from 'immutable';
import { generateList } from './initItemList';
import { generateId } from './generateId';

export const generateItems = () => {
  return new OrderedMap(
    generateList()
      .map((itemText) => {
        const guid = generateId();
        const MyRecord = Record({
          id: guid,
          text: itemText,
          isEdited: false,
        });
        return (
        [
          guid,
          new MyRecord(),
        ]
        );
      })
  );
};
