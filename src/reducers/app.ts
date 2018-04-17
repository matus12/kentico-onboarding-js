import { combineReducers } from 'redux';
import { todoList } from './todo-list/todoList';
import { IAppState } from '../models/IAppState';
import { fetchStatus } from './todo-list/fetchStatus';
import { error } from './todo-list/error';
import { reducer as formReducer } from 'redux-form';

export const app = combineReducers<IAppState>({
  todoList,
  error,
  fetchStatus,
  form: formReducer
});
