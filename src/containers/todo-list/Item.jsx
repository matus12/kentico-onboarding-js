import PropTypes from 'prop-types';
import memoize from 'memoizee';
import { connect } from 'react-redux';
import { Item } from '../../components/todo-list/Item';
import {
  createIndexedItem,
} from '../../selectors/createIndexedItem';

const createIndexedItemMemoized = memoize(createIndexedItem);

const mapStateToProps = ({ todoList: { items } }, { id, index }) => {
  const retrievedItem = items.get(id);
  const indexedItem = createIndexedItemMemoized(
    retrievedItem,
    index);

  return { item: indexedItem };
};

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(Item);

connectedComponent.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export { connectedComponent as Item };
