import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { EditedItem } from '../../components/todo-list/EditedItem';
import {
  updateItem,
  deleteItem,
  cancelItemEditing,
} from '../../actions/actionCreators';

const mapDispatchToProps = (dispatch, { item: { payload: { id } } }) => ({
  onUpdateItem: (text) => dispatch(updateItem(id, text)),
  onDeleteItem: () => dispatch(deleteItem(id)),
  onEditStop: () => dispatch(cancelItemEditing(id)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(EditedItem);

export { connectedComponent as EditedItem };

connectedComponent.propTypes = {
  item: ImmutablePropTypes.contains({
    index: PropTypes.number.isRequired,
    payload: ImmutablePropTypes.contains({
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
