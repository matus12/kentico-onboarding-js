import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import logger from 'redux-logger';
import { getInitialState } from './utils/getInitialState';
import {
  applyMiddleware,
  compose,
  createStore, Middleware, Store,
} from 'redux';
import { Provider } from 'react-redux';
import { app } from './reducers/app';
import { App } from './App';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware: Middleware = logger;

const store: Store<any> = createStore(app, getInitialState(), composeEnhancers(
  applyMiddleware(middleware),
));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root'),
);
