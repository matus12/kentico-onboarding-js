import { combineReducers } from 'redux';
import { items } from './todoItem/items';

export const list = combineReducers({
  items,
});
