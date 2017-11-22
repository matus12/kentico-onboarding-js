import React from 'react';
import { PlainItem } from '../../containers/todo-list/PlainItem';
import { EditedItem } from '../../containers/todo-list/EditedItem';
import { ListItem } from '../../models/ListItem';

interface IProps {
  item: ListItem;
  index: number;
}

export const Item = (props: IProps) =>
  <li className="list-group-item">
    {(props.item.isEdited) ?
      <EditedItem
        item={props.item}
      /> :
      <PlainItem
        item={props.item}
      />
    }
  </li>;
