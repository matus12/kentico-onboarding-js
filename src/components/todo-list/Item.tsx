import React, { PropTypes } from 'react';
import { PlainItem } from '../../containers/todo-list/PlainItem';
import { EditedItem } from '../../containers/todo-list/EditedItem';
import { IndexedItem } from '../../models/IndexedItem';

interface IProps {
  item: IndexedItem;
}

export const Item: React.SFC<IProps> = (props: IProps) =>
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

Item.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    isEdited: PropTypes.bool.isRequired,
  }).isRequired,
};
