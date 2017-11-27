import React from 'react';
import { PlainItem } from '../../containers/todo-list/PlainItem';
import { EditedItem } from '../../containers/todo-list/EditedItem';
import { IndexedItem } from '../../models/IndexedItem';

export const Item = (props: IndexedItem) =>
  <li className="list-group-item">
    {(props.payload.isEdited) ?
      <EditedItem
        item={props}
      /> :
      <PlainItem
        item={props}
      />
    }
  </li>;
