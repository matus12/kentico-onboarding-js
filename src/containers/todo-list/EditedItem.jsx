import { connect } from 'react-redux';
import { EditedItem } from '../../components/todo-list/EditedItem';
import {
  updateItem,
  deleteItem,
  toggleItem,
} from '../../actions/actionCreators';

const mapDispatchToProps = (dispatch, { item: { id } }) => ({
  onUpdateItem: (text) => dispatch(updateItem(id, text)),
  onDeleteItem: () => dispatch(deleteItem(id)),
  onEditStop: () => dispatch(toggleItem(id, false)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(EditedItem);

export { connectedComponent as EditedItem };
