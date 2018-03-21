import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Form from './todo-list/Form';

const login = (history: any) => (values: any) => {
  history.push('/list', {values});
};

const Index = withRouter(({history}) =>
  <div className="text-center">
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
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
              newItem: true
            }
          }
          onSubmit={login(history)} />
      </div>
    </MuiThemeProvider>
  </div>);

export { Index };
