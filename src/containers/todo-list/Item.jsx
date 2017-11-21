import { connect } from 'react-redux';
import { Item } from '../../components/todo-list/Item';

const mapStateToProps = ({ list: { items } }, ownProps) => ({
  item: items.get(ownProps.id),
});

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(Item);

export { connectedComponent as Item };
