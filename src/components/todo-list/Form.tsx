import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { validateText } from '../../utils/validateText';

const validate = (values: any) => {
  const errors: any = {};
  const requiredFields = [
    'todo'
  ];
  requiredFields.forEach(field => {
    if (!validateText(values.todo)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const renderTextField =
  ({
     input,
     label,
     meta: {touched, error},
     ...custom
   }: any) => (
    <MuiThemeProvider>
      <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    </MuiThemeProvider>
  );

const renderButton =
  ({
     _input,
     label,
     meta: {_touched, _error},
     ...custom
   }: any) => (
    <MuiThemeProvider>
      <FlatButton
        type={onsubmit}
        label={label}
        primary={true}
        {...custom}
      />
    </MuiThemeProvider>
  );

let InputForm = (props: any) => {
  const {handleSubmit, initialValues} = props;
  return (
    initialValues.newItem
      ? <form onSubmit={handleSubmit}>
        <Field
          name="todo"
          component={renderTextField}
          label={initialValues.text}
        />
        {initialValues.text === 'LOGIN'
          ? <span />
          : <Field
            name="addButton"
            component={renderButton}
            label="ADD"
          />}
      </form>
      : <form onSubmit={handleSubmit}>
        <Field
          style={{width: 300}}
          name="todo"
          component={renderTextField}
          label={initialValues.text}
        />
        <Field
          name="addButton"
          component={renderButton}
          label="SAVE"
        />
        <MuiThemeProvider>
          <FlatButton
            onClick={initialValues.cancel}
          >
            CANCEL
          </FlatButton>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <FlatButton
            onClick={initialValues.delete}
            secondary={true}
          >
            DELETE
          </FlatButton>
        </MuiThemeProvider>
      </form>
  );
};

const createReduxForm = reduxForm({validate});

const Form = createReduxForm(InputForm);

export default Form;
