import { connect } from 'react-redux';
import { AddedItem } from '../../components/AddedItem';
import { insertItem } from '../../actions/actionCreators';
import { generateId } from '../../utils/generateId';

const mapDispatchToProps = (dispatch) => ({
  onAddItem: (text) => dispatch(insertItem(generateId(), text)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(AddedItem);

export { connectedComponent as AddedItemRedux };
