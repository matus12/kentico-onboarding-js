import { connect } from 'react-redux';
import { PlainItem } from '../../components/todo-list/PlainItem';
import {
  editItem,
} from '../../actions/actionCreators';

const mapDispatchToProps = (dispatch, { item: { id } }) => ({
  onEditStart: () => dispatch(editItem(id)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(PlainItem);

export { connectedComponent as PlainItem };
