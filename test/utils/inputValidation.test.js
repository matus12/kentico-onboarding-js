import {
  validateText,
} from '../../src/utils/inputValidation';

const emptyInput = '';
const validInput = 'asdfasf';
const invalidInput = '          ';

describe('Input validation', () => {
  it('validates input correctly', () => {
    expect(validateText(validInput)).toEqual(true);
    expect(validateText(emptyInput)).toBe(false);
    expect(validateText(invalidInput)).toBe(false);
  });
});
