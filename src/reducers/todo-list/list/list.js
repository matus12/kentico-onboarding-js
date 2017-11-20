import { combineReducers } from 'redux';
import { items } from './items/items';
import { item } from './items/item';

export const list = combineReducers({
  items,
  item,
});
