import { connect } from 'react-redux';
import { Item } from '../../components/todo-list/Item';

const mapStateToProps = (state, ownProps) => ({
  item: state.list.items.get(ownProps.id),
  index: ownProps.index,
});

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(Item);

export { connectedComponent as Item };
