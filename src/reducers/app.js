import { combineReducers } from 'redux';
import { list } from './todoList/list';

export const app = combineReducers({
  list,
});
