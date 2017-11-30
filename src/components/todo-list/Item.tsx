import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PlainItem } from '../../containers/todo-list/PlainItem';
import { EditedItem } from '../../containers/todo-list/EditedItem';
import { IndexedItem } from '../../models/IndexedItem';

interface IProps {
  item: IndexedItem;
}

const Item: React.SFC<IProps> = (props: IProps) =>
  (props.item.isEdited) ?
    <EditedItem
      item={props.item}
    /> :
    <PlainItem
      item={props.item}
    />


Item.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    isEdited: PropTypes.bool.isRequired,
  }).isRequired,
};

export { Item }
