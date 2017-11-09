import { combineReducers } from 'redux';
import { todoList } from './todoList/list';

export const app = combineReducers({
  todoList,
});
