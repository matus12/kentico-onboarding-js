import { connect } from 'react-redux';
import { List } from '../../components/List';
import {
  deleteItem,
  insertItem,
  updateItem,
} from '../../actions/actionCreators';

const mapStateToProps = (state) => ({
  items: state.list.items,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateItem: (item) => dispatch(updateItem(item)),
  onDeleteItem: (id) => dispatch(deleteItem(id)),
  onAddItem: (text) => dispatch(insertItem(text)),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(List);

export { connectedComponent as ListRedux };
