import { OrderedMap } from 'immutable';
import { generateList } from './initItemList';
import { generateId } from './generateId';
import { ItemRecord } from './itemRecord';

export const generateItems = () => {
  return new OrderedMap(
    generateList()
      .map((itemText) => {
        const guid = generateId();
        return (
        [
          guid,
          new ItemRecord({
            id: guid,
            text: itemText,
          }),
        ]
        );
      })
  );
};
