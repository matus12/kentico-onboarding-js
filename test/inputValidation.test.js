import {
  isInputValid,
  chooseFormStyle,
  fillInTitle,
} from '../src/utils/inputValidation';

const emptyInput = '';
const validInput = 'asdfasf';
const invalidInput = '          ';

describe('Input validation', () => {
  it('validates input correctly', () => {
    expect(isInputValid(validInput)).toEqual(true);
    expect(isInputValid(emptyInput)).toBe(false);
    expect(isInputValid(invalidInput)).toBe(false);
  });

  it('chooses right form style', () => {
    expect(chooseFormStyle(invalidInput)).toEqual('form-control-invalid-input');
    expect(chooseFormStyle(validInput)).toEqual('form-control');
  });

  it('fills out button title correctly', () => {
    expect(fillInTitle(validInput)).toEqual('');
    expect(fillInTitle(invalidInput)).toEqual('Please fill out the field');
  });
});
