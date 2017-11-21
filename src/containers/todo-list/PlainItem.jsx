import { connect } from 'react-redux';
import { PlainItem } from '../../components/todo-list/PlainItem';
import {
  toggleItem,
} from '../../actions/actionCreators';

const mapStateToProps = (state, ownProps) => ({
  item: ownProps.item,
  index: ownProps.index,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onEditStart: () => dispatch(toggleItem(ownProps.item.id, true)),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(PlainItem);

export { connectedComponent as PlainItem };
