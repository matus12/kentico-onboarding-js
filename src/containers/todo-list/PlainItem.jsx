import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { PlainItem } from '../../components/todo-list/PlainItem';
import {
  editItem,
} from '../../actions/actionCreators';

const mapDispatchToProps = (dispatch, { item: { payload: { id } } }) => ({
  onEditStart: () => dispatch(editItem(id)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(PlainItem);

connectedComponent.propTypes = {
  item: ImmutablePropTypes.contains({
    index: PropTypes.number.isRequired,
    payload: ImmutablePropTypes.contains({
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export { connectedComponent as PlainItem };
