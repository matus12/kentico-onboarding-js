import { connect } from 'react-redux';
import { List } from '../../components/todo-list/List';

const mapStateToProps = ({ todoList: { items } }) => ({
  ids: items.keySeq(),
});

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(List);

export { connectedComponent as List };
