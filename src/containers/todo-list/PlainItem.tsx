import { connect, Dispatch } from 'react-redux';
import { PlainItem } from '../../components/todo-list/PlainItem';
import {
  editItem,
} from '../../actions/actionCreators';
import { ListItem } from '../../models/ListItem';

interface IState {

}

interface IProps {
  item: ListItem;
}

const mapDispatchToProps = (dispatch: Dispatch<IState>, ownProps: IProps) => ({
  onEditStart: () => dispatch(editItem(ownProps.item.id)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(PlainItem);

export { connectedComponent as PlainItem };