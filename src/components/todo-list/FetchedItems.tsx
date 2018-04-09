import * as React from 'react';
import { List } from '../../containers/todo-list/List';
import { Error } from './Error';
import { IAction } from '../../actions/IAction';

export interface IFetchDataProps {
  fetchFailed: boolean;
  errorMessage: string;
}

export interface IFetchCallbackProps {
  readonly onFetchItems: () => void;
  readonly onFetchErrorClose: () => IAction;
  readonly onFetchStart: () => IAction;
}

export class FetchedItems extends React.PureComponent<IFetchDataProps & IFetchCallbackProps> {

  constructor(props: IFetchDataProps & IFetchCallbackProps) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchStart();
    this.props.onFetchItems();
  }

  render(): JSX.Element {
    return (
      <div className="row">
        {!this.props.fetchFailed
          ? <List />
          : <div className="col-sm-12 col-md-offset-2 col-md-8">
              <Error
                errorMessage={this.props.errorMessage}
                onCloseError={this.props.onFetchErrorClose}
              />
          </div>
        }
      </div>
    );
  }
}
