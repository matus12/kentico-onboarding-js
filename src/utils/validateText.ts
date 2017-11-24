export const validateText = (inputText: string) =>
  (!!inputText && !!inputText.match(/\w/));
