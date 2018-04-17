import { reduxForm } from 'redux-form';
import { InputForm } from '../components/InputForm';

const Form = reduxForm({
  form: 'input',
  initialValues: {
    inputForm: 'ahoj'
  },
})(InputForm);

export default Form;
