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

const mapDispatchToProps = (dispatch) => ({
  onUpdateItem: (id, text) => dispatch(updateItem(id, text)),
  onDeleteItem: (id) => dispatch(deleteItem(id)),
  onEditStop: (id) => dispatch(endEdit(id)),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(EditedItem);

export { connectedComponent as EditedItemRedux };
