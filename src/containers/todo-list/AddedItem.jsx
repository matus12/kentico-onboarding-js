import { connect } from 'react-redux';
import { AddedItem } from '../../components/AddedItem';
import { insertItem } from '../../actions/actionCreators';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  onAddItem: (text) => dispatch(insertItem(text)),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(AddedItem);

export { connectedComponent as AddedItemRedux };
