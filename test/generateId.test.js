import { generateId } from '../src/utils/generateId';

describe('Generate id', () => {
  it('generates unique id', () => {
    const guid1 = generateId();
    const guid2 = generateId();

    expect(guid1).not.toEqual(guid2);
  });

  it('returns string of length 36', () => {
    const guid = generateId();

    expect(typeof(guid)).toEqual('string');
    expect(guid.length).toBe(36);
  });

  it('id has dashes at certain positions', () => {
    const guid = generateId();

    expect(guid[8]).toEqual('-');
    expect(guid[13]).toEqual('-');
    expect(guid[18]).toEqual('-');
    expect(guid[23]).toEqual('-');
  });

  it('id contains alpha-numeric characters', () => {
    const guid = generateId();

    expect(guid.substr(0, 7)).toMatch(/\w/);
    expect(guid.substr(9, 4)).toMatch(/\w/);
    expect(guid.substr(14, 4)).toMatch(/\w/);
    expect(guid.substr(19, 4)).toMatch(/\w/);
    expect(guid.substr(24, 13)).toMatch(/\w/);
  });
});
