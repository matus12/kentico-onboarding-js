import { connect, Dispatch } from 'react-redux';
import { PlainItem } from '../../components/todo-list/PlainItem';
import {
  editItem,
} from '../../actions/actionCreators';
import { IAppState } from '../../IAppState';
import { IndexedItem } from '../../models/IndexedItem';
import { IAction } from '../../actions/IAction';
import * as PropTypes from 'prop-types';

interface IProps {
  item: IndexedItem;
}

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, ownProps: IProps) => ({
  onEditStart: (): IAction => dispatch(editItem(ownProps.item.id)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(PlainItem);

connectedComponent.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export { connectedComponent as PlainItem };
