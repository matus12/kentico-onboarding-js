import { connect, Dispatch } from 'react-redux';
import { EditedItem } from '../../components/todo-list/EditedItem';
import {
  updateItem,
  deleteItem,
  cancelItemEditing,
} from '../../actions/actionCreators';
import { IListItem } from '../../models/IListItem';
import { IAppState } from '../../IAppState';

interface IProps {
  item: IListItem;
}

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, ownProps: IProps) => ({
  onUpdateItem: (text: string) => dispatch(updateItem(ownProps.item.id, text)),
  onDeleteItem: () => dispatch(deleteItem(ownProps.item.id)),
  onEditStop: () => dispatch(cancelItemEditing(ownProps.item.id)),
});


const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(EditedItem);

export { connectedComponent as EditedItem };
