import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { PlainItemRedux } from '../containers/todo-list/PlainItem';
import { EditedItemRedux } from '../containers/todo-list/EditedItem';

export function Item(props) {
  return (
    <li className="list-group-item">
      {(props.item.isEdited) ?
        <EditedItemRedux
          item={props.item}
          index={props.index}
        /> :
        <PlainItemRedux
          index={props.index}
          item={props.item}
        />
      }
    </li>
  );
}

Item.propTypes = {
  item: ImmutablePropTypes.contains({
    id: PropTypes.string.isRequired,
    isEdited: PropTypes.bool.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
