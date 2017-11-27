import { generateId } from './generateId';

describe('Generate id', () => {
  it('generates unique id', () => {
    const guid1: string = generateId();
    const guid2: string = generateId();

    expect(guid1).not.toEqual(guid2);
  });

  it('returns valid guid string', () => {
    const guid: string = generateId();

    expect(guid).toMatch(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);
  });
});
