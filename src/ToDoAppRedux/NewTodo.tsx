/** @jsxImportSource @emotion/react */
import React, { useRef } from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { TodoItem } from './TodoItem';
import { Btn_Style, Div_TodoItem } from './themeTodo';
import { colors, mediaSize } from '../utils/theme';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, store } from '../utils/store';
import {
  addTodo,
  deleteTodo,
  completeTodo,
  filteredTodos,
  changeOrder,
} from './toDoAppSlice';

export type Todo = {
  id: string;
  todoName: string;
  complete: boolean;
};

export type TodoFilter = 'all' | 'active' | 'completed';

export const TodoPage = () => {
  return (
    <Provider store={store}>
      <TodoAppRedux />
    </Provider>
  );
};

const TodoAppRedux = () => {
  const todosFiltered = useSelector(
    (state: RootState) => state.todos.valueFiltered
  );
  const dispatch = useDispatch<AppDispatch>();
  
  const [todoName, setTodoName] = useState('');
  const dragItem = useRef('');
  const dragOverItem = useRef('');

  const dragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    dragItem.current = id;
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    dragOverItem.current = id;
  };

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch(
      changeOrder({
        dragItemId: dragItem.current,
        droppedItemId: dragOverItem.current,
      })
    );
    dragItem.current = '';
    dragOverItem.current = '';
    dispatch(filteredTodos());
  };

  const completeTodoButton = (id: string) => {
    dispatch(completeTodo(id));
    dispatch(filteredTodos());
  };

  const deleteTodoButton = (id: string) => {
    dispatch(deleteTodo(id));
    dispatch(filteredTodos());
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodo(todoName));
    dispatch(filteredTodos('all'));
    setTodoName('');
  };

  return (
    <div
      css={css`
        margin: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <form onSubmit={submitHandler}>
        <div>
          <Input_Todo
            type='text'
            placeholder='What needs to be done?'
            maxLength={20}
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
        </div>
      </form>

      <Div_List>
        {todosFiltered.map((todoItem, index) => (
          <TodoItem
            key={todoItem.id}
            todoItem={todoItem}
            completeTodo={completeTodoButton}
            deleteTodoButton={deleteTodoButton}
            dragStart={dragStart}
            dragEnter={dragEnter}
            dragEnd={drop}
          />
        ))}
      </Div_List>

      <Div_TodoItem>
        <Btn_Style
          onClick={() => {
            dispatch(filteredTodos('active'));
          }}
        >
          Active
        </Btn_Style>
        <Btn_Style
          css={css`
            width: 90px;
          `}
          onClick={() => {
            dispatch(filteredTodos('completed'));
          }}
        >
          Completed
        </Btn_Style>
        <Btn_Style
          onClick={() => {
            dispatch(filteredTodos('all'));
          }}
        >
          All
        </Btn_Style>
      </Div_TodoItem>
    </div>
  );
};

const Div_List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
