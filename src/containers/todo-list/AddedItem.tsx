import { connect, Dispatch } from 'react-redux';
import { AddedItem } from '../../components/todo-list/AddedItem';
import { insertItem } from '../../actions/actionCreators';
import { IAppState } from '../../IAppState';

const mapDispatchToProps = (dispatch: Dispatch<IAppState>) => ({
  onAddItem: (text: string) => dispatch(insertItem(text)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(AddedItem);

export { connectedComponent as AddedItem };
