import { connect } from 'react-redux';
import { Item } from '../../components/Item';
import {
  updateItem,
  deleteItem,
} from '../../actions/actionCreators';

const mapStateToProps = (state, ownProps) => ({
  item: ownProps.item,
  index: ownProps.index,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateItem: (item) => dispatch(updateItem(item)),
  onDeleteItem: (id) => dispatch(deleteItem(id)),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(Item);

export { connectedComponent as ItemRedux };
