import { connect } from 'react-redux';
import { PlainItem } from '../../components/PlainItem';
import { updateItem } from '../../actions/actionCreators';

const mapStateToProps = (state, ownProps) => ({
  item: ownProps.item,
  index: ownProps.index,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateItem: (item) => dispatch(updateItem(item)),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(PlainItem);

export { connectedComponent as PlainItemRedux };
