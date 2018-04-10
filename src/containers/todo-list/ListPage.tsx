import { connect, Dispatch } from 'react-redux';
import {
  ListPage,
  IFetchCallbackProps,
  IFetchDataProps
} from '../../components/todo-list/ListPage';
import { fetchItems } from '../../actions';
import { IAction } from '../../actions/IAction';
import { IAppState } from '../../models/IAppState';
import { closeFetchError, startFetching } from '../../actions/actionCreators';

const mapStateToProps = (state: IAppState): IFetchDataProps => ({
  fetchFailed: state.fetchStatus.hasError,
  errorMessage: state.fetchStatus.errorMessage,
  isFetching: state.fetchStatus.isFetching
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IFetchCallbackProps => ({
  onFetchItems: (): Promise<IAction> => dispatch(fetchItems()),
  onFetchErrorClose: (): IAction => dispatch(closeFetchError()),
  onFetchStart: (): IAction => dispatch(startFetching())
});

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(ListPage);

export { connectedComponent as ListPage };