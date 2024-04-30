import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  _id?: string;
  name: string;
  age: string;
  position: string;
  gender: string;
  terms: boolean;
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter(todo => todo._id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.findIndex(todo => todo._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, setTodos } = todoSlice.actions;

export default todoSlice.reducer;
