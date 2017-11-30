import { generateId, uuId } from './generateId';

describe('Generate id', () => {
  it('generates unique id', () => {
    const guid1: uuId = generateId();
    const guid2: uuId = generateId();

    expect(guid1).not.toEqual(guid2);
  });

  it('returns valid guid string', () => {
    const guid: uuId = generateId();

    expect(guid).toMatch(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);
  });
});
