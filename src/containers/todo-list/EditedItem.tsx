import { connect, Dispatch } from 'react-redux';
import { EditedItem } from '../../components/todo-list/EditedItem';
import {
  updateItem,
  deleteItem,
  cancelItemEditing,
} from '../../actions/actionCreators';
import { IAppState } from '../../IAppState';
import { IndexedItem } from '../../models/IndexedItem';
import { IAction } from '../../actions/IAction';
import { PropTypes } from 'react';

interface IProps {
  item: IndexedItem;
}

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, ownProps: IProps) => ({
  onUpdateItem: (text: string): IAction => dispatch(updateItem(ownProps.item.id, text)),
  onDeleteItem: (): IAction => dispatch(deleteItem(ownProps.item.id)),
  onEditStop: (): IAction => dispatch(cancelItemEditing(ownProps.item.id)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(EditedItem);

connectedComponent.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export { connectedComponent as EditedItem };
