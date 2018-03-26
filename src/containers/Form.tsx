import { reduxForm } from 'redux-form';
import { validateText } from '../utils/validateText';
import { InputForm } from '../components/InputForm';
import { Dispatch } from 'redux';
import { IAppState } from '../models/IAppState';
import { deleteFromServer } from '../actions';
import { cancelItemEditing } from '../actions/actionCreators';
import { IAction } from '../actions/IAction';
import { connect } from 'react-redux';

const validate = (values: any) => {
  const errors: any = {};
  const todo = 'todo';
  if (!validateText(values.todo)) {
    errors[todo] = 'Required';
  }
  return errors;
};

const mapStateToProps = (state: IAppState, ownProps: {form: string}) => ({
  isNewItem: !state.todoList.items.has(ownProps.form)
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, ownProps: any) => ({
  onDeleteItem: (): Promise<IAction> => dispatch(deleteFromServer(ownProps.form)),
  onEditStop: (): IAction => dispatch(cancelItemEditing(ownProps.form)),
});

const Props = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputForm);

const Form = reduxForm({validate})(Props);

export default Form;
