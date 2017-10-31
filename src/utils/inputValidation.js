export const isInputValid = (inputText) =>
  (!!inputText && inputText.match(/\w/));

export const chooseFormStyle = (inputText) => (
  isInputValid(inputText) ?
    'form-control' :
    'form-control-invalid-input'
);

export const fillInTitle = (inputText) => (
  isInputValid(inputText) ?
    '' :
    'Please fill out the field'
);
