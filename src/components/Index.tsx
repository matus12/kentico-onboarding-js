import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Omit, RouteComponentProps, withRouter } from 'react-router';
import Form from '../containers/Form';

const login = (history: { push: (path: string, state?: any) => void }) => (values: {}) => {
  history.push('/list', {values});
};

const Index: React.ComponentClass<Omit<RouteComponentProps<any>, keyof RouteComponentProps<any>>> =
  withRouter(({history}) =>
    <div className="text-center">
      <MuiThemeProvider>
        <div style={
          {
            marginTop: 400
          }}
        >
          <Form
            form="loginForm"
            initialValues={
              {
                text: 'LOGIN',
              }
            }
            onSubmit={login(history)} />
        </div>
      </MuiThemeProvider>
    </div>);

export { Index };
