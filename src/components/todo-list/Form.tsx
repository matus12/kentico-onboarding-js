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
     _label,
     meta: {_touched, _error},
     ...custom
  }: any) => (
    <MuiThemeProvider>
      <FlatButton
        type={onsubmit}
        label="ADD"
        primary={true}
        {...custom}
      />
    </MuiThemeProvider>
);

let InputForm = (props: any) => {
  const {handleSubmit, initialValues} = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="todo"
          component={renderTextField}
          label={initialValues.text}
        />
        <Field
          name="addButton"
          component={renderButton}
        />
      </div>
    </form>
  );
};

const createReduxForm = reduxForm({validate});

const Form = createReduxForm(InputForm);

export default Form;
