/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { LinkComponent } from '../components/LinkComponent';
import { urls } from '../utils/urls';
import { colors } from '../utils/theme';
import { Div_ContainerPage } from '../components/Components';
import { TodoPage } from './NewTodo';
import { H3_Month } from '../components/Components';
import { Helmet } from 'react-helmet';

export const ToDoApp = () => {
  return (
    <Div_ContainerPage
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <Helmet>
        <title>AD - ToDo App</title>
      </Helmet>
      <H3_Month>todos</H3_Month>

      <TodoPage />

      <LinkComponent to={urls.mainpage} color={colors.highlight}>
        GO HOME
      </LinkComponent>
    </Div_ContainerPage>
  );
};
