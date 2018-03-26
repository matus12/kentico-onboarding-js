import * as React from 'react';
import { Button } from './Button';
import { IAction } from '../actions/IAction';
import { InputField } from './InputField';
import { PropTypes } from 'react';

interface IProps {
  handleSubmit: () => void;
  initialValues: {
    text: string;
  };
  onEditStop: () => IAction;
  onDeleteItem: () => Promise<IAction>;
  isNewItem: boolean;
}

const loginLabel = 'LOGIN';
const addLabel = 'ADD';
const saveLabel = 'SAVE';
const cancelLabel = 'CANCEL';
const deleteLabel = 'DELETE';

const InputForm: React.SFC<IProps> = (props: IProps): JSX.Element => {
  const {
    handleSubmit,
    initialValues,
    onEditStop,
    onDeleteItem,
    isNewItem
  } = props;

  const inputWidth = 265;

  const submitButtonLabel =
    initialValues.text === loginLabel
      ? loginLabel
      : isNewItem
      ? addLabel
      : saveLabel;

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        width={inputWidth}
        text={initialValues.text}
      />
      <Button
        label={submitButtonLabel}
        onClick={handleSubmit}
        primary
      />
      {!isNewItem
        ? <span>
          <Button
            label={cancelLabel}
            onClick={onEditStop}
          />
          <Button
            label={deleteLabel}
            onClick={onDeleteItem}
            secondary
          />
        </span>
        : null}
    </form>);
};

InputForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    text: PropTypes.string,
  }),
  onEditStop: PropTypes.func,
  onDeleteItem: PropTypes.func,
  isNewItem: PropTypes.bool
};

export { InputForm }
