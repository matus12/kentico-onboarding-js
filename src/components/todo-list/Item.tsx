import React from 'react';
import { PlainItem } from '../../containers/todo-list/PlainItem';
import { EditedItem } from '../../containers/todo-list/EditedItem';
import { IndexedItem } from '../../models/IndexedItem';

export const Item = (props: { item: IndexedItem }) =>
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
