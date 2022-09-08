/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { colors, mediaSize } from '../utils/theme';
import { Btn_Style_Basic, Div_TodoItem } from './themeTodo';
import { Btn_Style } from './themeTodo';
import { Todo } from './NewTodo';

type Props = {
  todoItem: Todo;
  completeTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

export const TodoItem = (p: Props) => {
  return (
    <Div_TodoItem>
      <Btn_Style
        onClick={() => p.completeTodo(p.todoItem.id)}
        complete={p.todoItem.complete}
        highlight={colors.highlight}
        secondary={colors.secondary}
      >
        Complete
      </Btn_Style>
      <Div_Complete complete={p.todoItem.complete}>
        {p.todoItem.todoName}
      </Div_Complete>
      <Btn_Style_Basic onClick={() => p.deleteTodo(p.todoItem.id)}>
        Delete
      </Btn_Style_Basic>
    </Div_TodoItem>
  );
};

type Div_Complete_Props = {
  complete: boolean;
};

const Div_Complete = styled.div<Div_Complete_Props>`
  @media (${mediaSize.mediaMobile}) {
    width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (${mediaSize.mediaLaptop}) {
    width: 530px;
  }
  font-size: 25px;
  color: ${colors.secondary};
  text-decoration: ${(props) => (props.complete ? 'line-through 3px' : 'none')};
`;
