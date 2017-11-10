import { OrderedMap } from 'immutable';
import { generateId } from './generateId';
import { ListItem } from '../models/itemRecord';

export const itemNames = [
  'Make a coffee',
  'Master ReactJS',
  'Learn ReduxJS',
  'Help making Kentico Cloud awesome!',
];

export const getMapOfItems = () => {
  return new OrderedMap(
    itemNames
      .map((itemText) => {
        const guid = generateId();
        return (
        [
          guid,
          new ListItem({
            id: guid,
            text: itemText,
          }),
        ]
        );
      })
  );
};
