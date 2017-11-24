import { OrderedMap } from 'immutable';
import { generateId } from './generateId';
import { IListItem } from '../models/IListItem';
import { ListItem } from '../models/ListItem';
import { IAppState } from '../IAppState';

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
          const guid: string = generateId();
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
