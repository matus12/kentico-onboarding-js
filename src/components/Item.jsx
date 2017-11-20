import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { PlainItem } from '../containers/todo-list/PlainItem';
import { EditedItem } from '../containers/todo-list/EditedItem';

export const Item = props =>
  <li className="list-group-item">
    {(props.item.isEdited) ?
      <EditedItem
        item={props.item}
        index={props.index}
      /> :
      <PlainItem
        index={props.index}
        item={props.item}
      />
    }
  </li>;

Item.propTypes = {
  item: ImmutablePropTypes.contains({
    id: PropTypes.string.isRequired,
    isEdited: PropTypes.bool.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
