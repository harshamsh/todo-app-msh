import { SET_TODO_ITEM, SET_TODO_LIST } from "../constants";

// set todo list to the redux global state obtained from DB
export const setTodoList = (payload) => ({
  type: SET_TODO_LIST,
  payload,
});

export const setTodoItem = (payload) => ({
  type: SET_TODO_ITEM,
  payload,
});
