import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Item } from '../../components/todo-list/Item';
import { IndexedItem } from '../../models/IndexedItem';

const memoize = require('memoizee');
const memProfile = require('memoizee/profile');

const selector = (items, id) => items.get(id);
const memoizedSelector = memoize(selector);

const createIndexedItem = (item, index) => ({
  item: new IndexedItem({
    index,
    id: item.id,
    text: item.text,
    isEdited: item.isEdited,
  }),
});

const createIndexedItemMemoized = memoize(createIndexedItem);

const mapStateToProps = ({ todoList: { items } }, { id, index }) => {
  const retrievedItem = items.get(id);
  // const retrievedItem = memoizedSelector(items, id);
  console.log(memProfile.log());

  return createIndexedItemMemoized(retrievedItem, index);
  // return ({
  //   item: new IndexedItem({
  //     index,
  //     id: retrievedItem.id,
  //     text: retrievedItem.text,
  //     isEdited: retrievedItem.isEdited,
  //   }),
  // });
};

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(Item);

connectedComponent.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export { connectedComponent as Item };
