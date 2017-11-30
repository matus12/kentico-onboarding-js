import { combineReducers } from 'redux';
import { todoList } from './todo-list/todoList';
import { IAppState } from './IAppState';

export const app = combineReducers<IAppState>({
  todoList,
});
