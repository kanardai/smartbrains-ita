/** @jsxImportSource @emotion/react */
import React from 'react';
import { useState, useContext } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { TodoItem } from './TodoItem';
import { Btn_Style, Div_TodoItem } from './themeTodo';
import { colors, mediaSize } from '../utils/theme';
import { useLocalStorage } from '../utils/LocalStorage';
import { generateId } from '../utils/generateId';
import { genericHookContextBuilder } from '../utils/genericHookContextBuilder';

export type Todo = {
  id: string;
  todoName: string;
  complete: boolean;
};

const Div_List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const useLogicState = () => {
  const [todos, setTodos] = useLocalStorage('todos', [] as Todo[]);
  const [todosFilter, setFilter] = useState(
    'all' as 'all' | 'active' | 'completed'
  );
  const [todoName, setTodoName] = useState('');

  const completeTodo = (id: string) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, complete: !todo.complete } : todo;
      })
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos([
      {
        id: generateId(),
        todoName: todoName,
        complete: false,
      },
      ...todos,
    ]);
    setTodoName('');
  };

  return {
    todos,
    setTodos,
    todosFilter,
    setFilter,
    todoName,
    setTodoName,
    completeTodo,
    deleteTodo,
    submitHandler,
  };
};

export const { ContextProvider: TodoContextProvider, Context: TodosContext } =
  genericHookContextBuilder(useLogicState);

export const TodoPage = () => {
  return (
    <TodoContextProvider>
      <NewTodo />
    </TodoContextProvider>
  );
};

export const NewTodo = () => {
  const logic = useContext(TodosContext);

  return (
    <div
      css={css`
        margin: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <form onSubmit={logic.submitHandler}>
        <div>
          <Input_Todo
            type='text'
            placeholder='What needs to be done?'
            maxLength={20}
            value={logic.todoName}
            onChange={(e) => logic.setTodoName(e.target.value)}
          />
        </div>
      </form>

      <Div_List>
        {logic.todos
          .filter((todo) => {
            if (logic.todosFilter === 'active') {
              return !todo.complete;
            } else if (logic.todosFilter === 'completed') {
              return todo.complete;
            } else {
              return todo;
            }
          })
          .map((todoItem) => (
            <TodoItem
              key={todoItem.id}
              todoItem={todoItem}
              completeTodo={logic.completeTodo}
              deleteTodo={logic.deleteTodo}
            />
          ))}
      </Div_List>

      <Div_TodoItem>
        <Btn_Style
          onClick={() => {
            logic.setFilter('active');
          }}
        >
          Active
        </Btn_Style>
        <Btn_Style
          css={css`
            width: 90px;
          `}
          onClick={() => {
            logic.setFilter('completed');
          }}
        >
          Completed
        </Btn_Style>
        <Btn_Style
          onClick={() => {
            logic.setFilter('all');
          }}
        >
          All
        </Btn_Style>
      </Div_TodoItem>
    </div>
  );
};

const Input_Todo = styled.input`
  @media (${mediaSize.mediaMobile}) {
    width: 300px;
  }
  @media (${mediaSize.mediaLaptop}) {
    width: 700px;
  }

  height: 80px;
  background-color: ${colors.primary};
  color: ${colors.secondary};
  border: solid 3px ${colors.highlight};
  border-radius: 20px;
  text-align: center;
  font-size: 25px;
  margin: 10px;
  &:focus {
    outline: none;
    border-width: 7px;
  }
`;
