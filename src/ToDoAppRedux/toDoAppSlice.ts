import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateId } from '../utils/generateId';
import { Todo, TodoFilter } from './NewTodo';

const loadStateLocalStorage = (key: string): [] | Todo[] => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const saveStateLocalStorage = (key: string, valueToStore: Todo[]) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  } catch (error) {
    console.error(error);
  }
};

const keyLocalStorage = 'todos';

const initialState = {
  value: loadStateLocalStorage(keyLocalStorage) as Todo[],
  valueFiltered: loadStateLocalStorage(keyLocalStorage) as Todo[],
  filter: 'all' as TodoFilter,
};

export const todoAppSlice = createSlice({
  name: 'todoApp',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.value.push(action.payload);
        saveStateLocalStorage(keyLocalStorage, state.value);
      },
      prepare: (todoName: string) => ({
        payload: {
          id: generateId(),
          todoName,
          complete: false,
        } as Todo,
      }),
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const index = state.value.findIndex((todo) => todo.id === action.payload);
      state.value.splice(index, 1);
      saveStateLocalStorage(keyLocalStorage, state.value);
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      const index = state.value.findIndex((todo) => todo.id === action.payload);
      state.value[index].complete = !state.value[index].complete;
      saveStateLocalStorage(keyLocalStorage, state.value);
    },
    filteredTodos: (state, action: PayloadAction<TodoFilter | undefined>) => {
      const filter = action.payload ?? state.filter;
      const valueFiltered = state.value.filter((todo) => {
        if (filter === 'active') {
          return !todo.complete;
        } else if (filter === 'completed') {
          return todo.complete;
        } else {
          return todo;
        }
      });
      return { ...state, valueFiltered: valueFiltered, filter: filter };
    },
    changeOrder: (
      state,
      action: PayloadAction<{ dragItemId: string; droppedItemId: string }>
    ) => {
      const draggedItemIndex = state.value.findIndex(
        (todo) => todo.id === action.payload.dragItemId
      );
      const droppedItemIndex = state.value.findIndex(
        (todo) => todo.id === action.payload.droppedItemId
      );
      const dragItemContent = state.value[draggedItemIndex];
      state.value.splice(draggedItemIndex, 1);
      state.value.splice(droppedItemIndex, 0, dragItemContent);
      saveStateLocalStorage(keyLocalStorage, state.value);
    },
  },
});

export const { addTodo, deleteTodo, completeTodo, filteredTodos, changeOrder } =
  todoAppSlice.actions;

export const todosReducer = todoAppSlice.reducer;
