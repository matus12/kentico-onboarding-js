import { connect } from 'react-redux';
import { EditedItem } from '../../components/todo-list/EditedItem';
import {
  updateItem,
  deleteItem,
  toggleItem,
} from '../../actions/actionCreators';

const mapStateToProps = (state, ownProps) => ({
  item: ownProps.item,
  index: ownProps.index,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdateItem: (text) => dispatch(updateItem(ownProps.item.id, text)),
  onDeleteItem: () => dispatch(deleteItem(ownProps.item.id)),
  onEditStop: () => dispatch(toggleItem(ownProps.item.id, false)),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(EditedItem);

export { connectedComponent as EditedItem };
