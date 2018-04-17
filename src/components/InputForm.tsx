import * as React from 'react';
import { Field } from 'redux-form';

export const InputForm: React.StatelessComponent<any> = (props: any) => {
  const {
    handleSubmit,
    initialValues
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="inputForm"
        component="input"
        type="text"
        placeholder={initialValues.text}
        value={initialValues.text}
      />
    </form>);
};
