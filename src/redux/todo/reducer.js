import { SET_TODO_ITEM, SET_TODO_LIST } from "../constants";

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_TODO_LIST:
      return {
        todos: actions.payload,
      };
    case SET_TODO_ITEM:
      console.log(actions.payload);
      return {
        todos: state.todos.map((el) => {
          if (el.id === actions.payload.id) return el;
          else return el;
        }),
      };
    default:
      return state;
  }
};

export default todoReducer;
