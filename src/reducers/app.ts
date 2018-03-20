import { combineReducers } from 'redux';
import { todoList } from './todo-list/todoList';
import { IAppState } from '../models/IAppState';
import { fetchStatus } from './fetchStatus';
import { postStatus } from './postStatus';
import { reducer as formReducer } from 'redux-form';

export const app = combineReducers<IAppState>({
  todoList,
  fetchStatus,
  postStatus,
  form: formReducer
});
