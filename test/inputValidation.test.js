import {
  isInputValid,
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
});
