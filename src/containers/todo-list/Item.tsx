import { connect } from 'react-redux';
import memoize from 'memoizee';
import { Item } from '../../components/todo-list/Item';
import { IAppState } from '../../IAppState';
import {
  createIndexedItem,
} from '../../reducers/todo-list/items/selectors/createIndexedItem';
import { ListItem } from '../../models/ListItem';
import { PropTypes } from 'react';

const createIndexedItemMemoized = memoize(createIndexedItem);

interface IProps {
  id: string;
  index: number;
}

const mapStateToProps = ({todoList: {items}}: IAppState, {id, index}: IProps) => {
  const retrievedItem: ListItem = items.get(id);

  return createIndexedItemMemoized(retrievedItem, index);
};

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(Item);

connectedComponent.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export { connectedComponent as Item };
