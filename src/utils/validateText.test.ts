import {
  validateText,
} from './validateText';

describe('validateText', () => {
  it('returns true for non-empty string', () => {
    const validString: string = 'asdfasf';

    const isStringValid: boolean = validateText(validString);

    expect(isStringValid).toEqual(true);
  });

  it('returns false for empty string', () => {
    const emptyString: string = '';

    const isStringValid: boolean = validateText(emptyString);

    expect(isStringValid).toBe(false);
  });

  it('returns false for string with whitespaces only', () => {
    const invalidString: string = '          ';

    const isStringValid: boolean = validateText(invalidString);

    expect(isStringValid).toBe(false);
  });
});
