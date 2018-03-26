import * as React from 'react';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { PropTypes } from 'react';

interface IProps {
  width: number;
  text: string;
}

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

const InputField: React.SFC<IProps> = (props: IProps): JSX.Element =>
  <Field
    style={{width: props.width}}
    name="todo"
    component={renderTextField}
    label={props.text}
  />;

InputField.propTypes = {
  width: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
};

export { InputField };
