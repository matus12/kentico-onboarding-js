import PropTypes from 'prop-types';
import memoize from 'memoizee';
import { connect } from 'react-redux';
import { Item } from '../../components/todo-list/Item';
import {
  createIndexedItem,
} from '../../reducers/todo-list/items/selectors/createIndexedItem';

const createIndexedItemMemoized = memoize(createIndexedItem);

const mapStateToProps = ({ todoList: { items } }, { id, index }) => {
  const retrievedItem = items.get(id);

  return createIndexedItemMemoized(retrievedItem, index);
};

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(Item);

connectedComponent.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export { connectedComponent as Item };
