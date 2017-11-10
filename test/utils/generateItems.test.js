import { getMapOfItems, itemNames } from '../../src/utils/getItems';
import { OrderedMap } from 'immutable';
import * as Guid from 'guid';

describe('generate items', () => {
  it('returns ordered map', () => {
    const maybeOrderedMap = getMapOfItems();

    const isOrderedMap = OrderedMap.isOrderedMap(maybeOrderedMap);

    expect(isOrderedMap).toBe(true);
  });

  it('returns ordered map with size of initItemList', () => {
    const orderedMap = getMapOfItems();

    const orderedMapSize = orderedMap.size;
    const numberOfItems = itemNames.length;

    expect(orderedMapSize).toEqual(numberOfItems);
  });

  it('returns ordered map where keys are guids', () => {
    const orderedMap = getMapOfItems();

    orderedMap.keySeq().forEach((element) => {
      expect(Guid.isGuid(element)).toBe(true);
    });
  });

  it('returns ordered map where values are items', () => {
    const orderedMap = getMapOfItems();

    orderedMap.valueSeq().forEach((element) => {
      expect(typeof(element)).toEqual(typeof({}));
      expect(element.isEdited).toBe(false);
      expect(Guid.isGuid(element.id)).toBe(true);
      expect(itemNames).toContain(element.text);
    });
  });
});
