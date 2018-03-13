import * as React from 'react';
import { List } from '../../containers/todo-list/List';
import { IAction } from '../../actions/IAction';
import { Error } from './Error';

export interface IFetchDataProps {
  fetchFailed: boolean;
  errorMessage: string;
}

export interface IFetchCallbackProps {
  readonly onFetchItems: () => void;
  readonly onFetchErrorClose: () => IAction;
}

export class FetchedItems extends React.PureComponent<IFetchDataProps & IFetchCallbackProps> {

  constructor(props: IFetchDataProps & IFetchCallbackProps) {
    super(props);
  }

  componentDidMount() {
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
                onRefresh={this.props.onFetchItems}
              />
          </div>
        }
      </div>
    );
  }
}
