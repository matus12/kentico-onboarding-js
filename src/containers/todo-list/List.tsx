import { connect, Dispatch } from 'react-redux';
import {
  IListCallbackProps,
  IListDataProps,
  List
} from '../../components/todo-list/List';
import { IAppState } from '../../models/IAppState';
import { getItemIds } from '../../selectors/getItemIds';
import { IAction } from '../../actions/IAction';
import { closePostError } from '../../actions/actionCreators';
import { postItem } from '../../actions';

const mapStateToProps = (state: IAppState): IListDataProps & any => ({
  ids: getItemIds(state),
  postError: state.postStatus.hasError,
  message: state.postStatus.message,
  text: state.postStatus.text
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IListCallbackProps => ({
  onPostErrorClose: (): IAction => dispatch(closePostError()),
  addItem: (text): Promise<IAction> => dispatch(postItem(text))
});

const mergeProps = (stateProps: any, dispatchProps: IListCallbackProps, ownProps: any): any =>
  Object.assign({}, stateProps, dispatchProps, ownProps, {
    onRR: (): Promise<IAction> => dispatchProps.addItem(stateProps.text)
  });

const enhancer = connect(mapStateToProps, mapDispatchToProps, mergeProps);
const connectedComponent = enhancer(List);

export { connectedComponent as List };
