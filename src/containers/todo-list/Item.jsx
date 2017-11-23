import { connect } from 'react-redux';
import { Item } from '../../components/todo-list/Item';

const mapStateToProps = ({ todoList: { items } }, { id }) => ({
  item: items.get(id),
});

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(Item);

export { connectedComponent as Item };
