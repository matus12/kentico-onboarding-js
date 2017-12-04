import { OrderedMap } from 'immutable';
import { generateId, uuId } from './generateId';
import { IListItem } from '../models/IListItem';
import { ListItem } from '../models/ListItem';
import { IAppState } from '../models/IAppState';

const itemNames: string[] = [
  'Make a coffee',
  'Master ReactJS',
  'Learn ReduxJS',
  'Help making Kentico Cloud awesome!',
];

export const getInitialState = (): IAppState => ({
  todoList: {
    items: OrderedMap(
      itemNames
        .map((itemText: string) => {
          const guid: uuId = generateId();
          const listItem: IListItem = {
            id: guid,
            text: itemText,
            isEdited: false,
          };
          return (
          [
            guid,
            new ListItem(listItem),
          ]
          );
        })
    ),
  },
});
