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
  onUpdateItem: (item, text) => dispatch(updateItem(item, text)),
  onDeleteItem: (id) => dispatch(deleteItem(id)),
  onEditStop: (item) => dispatch(endEdit(item)),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(EditedItem);

export { connectedComponent as EditedItemRedux };
