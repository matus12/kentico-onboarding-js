import { connect } from 'react-redux';
import { EditedItem } from '../../components/EditedItem';
import {
  updateItem,
  deleteItem,
  endEdit,
} from '../../actions/actionCreators';

const mapStateToProps = (state, ownProps) => ({
  item: ownProps.item,
  index: ownProps.index,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdateItem: (text) => dispatch(updateItem(ownProps.item.id, text)),
  onDeleteItem: () => dispatch(deleteItem(ownProps.item.id)),
  onEditStop: () => dispatch(endEdit(ownProps.item.id)),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(EditedItem);

export { connectedComponent as EditedItem };
