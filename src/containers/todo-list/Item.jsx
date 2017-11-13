import { connect } from 'react-redux';
import { Item } from '../../components/Item';

const mapStateToProps = (state, ownProps) => ({
  item: ownProps.item,
  index: ownProps.index,
});

const enhancer = connect(mapStateToProps, undefined);
const connectedComponent = enhancer(Item);

export { connectedComponent as ItemRedux };
