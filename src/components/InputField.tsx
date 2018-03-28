import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { WrappedFieldProps } from 'redux-form/lib/Field';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
   }: WrappedFieldProps) => (
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
