import '../sticky-footer.css';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FetchedItems } from '../containers/todo-list/FetchedItems';
import { PulseLoader } from 'react-spinners';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';

export interface IAppDataProps {
  readonly isFetching: boolean;
}

export class App extends React.PureComponent<IAppDataProps> {
  static propTypes = {
    isFetching: PropTypes.bool,
  };

  constructor(props: IAppDataProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="header clearfix">
            <h3 className="text-muted">Kentico Academy</h3>
          </div>

          <div className="jumbotron">
            <h1>JS onboarding</h1>
            <p className="lead">
              We will implement simple task using
              <a href="https://facebook.github.io/react/docs/hello-world.html">ReactJS</a> and later move on to refactor our app to use
              <a href="https://facebook.github.io/immutable-js/">Immutable</a> and
              <a href="http://redux.js.org/">Redux</a>.
            </p>
            <p>You can find all the relevant info in git repository.</p>
            <p>
              <a
                className="btn btn-lg btn-success"
                href="https://github.com/Suzii/kentico-onboarding-js"
                role="button"
              >Fork me on GitHub</a>
            </p>
          </div>

          <section id="app-content">
            <div className="text-center">
              <PulseLoader loading={this.props.isFetching}/>
            </div>
            <FetchedItems />
            <MuiThemeProvider>
              <Snackbar
                message={
                  'Hello ' + window.history.state.state.values.todo + '!'
                }
                open={!this.props.isFetching}
                autoHideDuration={3000}
              />
            </MuiThemeProvider>
          </section>
        </div>
        <footer className="footer">
          <p>&copy; 2017 Kentico software, s.r.o</p>
        </footer>
      </div>
    );
  }
}
