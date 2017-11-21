import { connect } from 'react-redux';
import { PlainItem } from '../../components/todo-list/PlainItem';
import {
  toggleItem,
} from '../../actions/actionCreators';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onEditStart: () => dispatch(toggleItem(ownProps.item.id, true)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(PlainItem);

export { connectedComponent as PlainItem };
