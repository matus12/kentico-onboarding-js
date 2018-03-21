import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Index } from './Index';
import { App } from '../containers/App';

export const Router = () =>
  <Switch>
    {window.history.state === null
    ? <Route path="/list" component={Index} />
    : <Route path="/list" component={App} />
    }
    <Route path="/" component={Index} />
  </Switch>;
