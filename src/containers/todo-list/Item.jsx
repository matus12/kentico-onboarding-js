import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Item } from '../../components/todo-list/Item';
import { IndexedItem } from '../../models/IndexedItem';

const mapStateToProps = ({ todoList: { items } }, { id, index }) => ({
  item: new IndexedItem({
    index,
    payload: items.get(id),
  }),
});

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(Item);

export { connectedComponent as Item };

connectedComponent.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
