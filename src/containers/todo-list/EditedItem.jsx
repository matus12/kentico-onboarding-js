import { connect } from 'react-redux';
import { EditedItem } from '../../components/todo-list/EditedItem';
import {
  updateItem,
  deleteItem,
  cancelEditItem,
} from '../../actions/actionCreators';

const mapDispatchToProps = (dispatch, { item: { payload: { id } } }) => ({
  onUpdateItem: (text) => dispatch(updateItem(id, text)),
  onDeleteItem: () => dispatch(deleteItem(id)),
  onEditStop: () => dispatch(cancelEditItem(id)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(EditedItem);

export { connectedComponent as EditedItem };
