/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors, mediaSize } from '../utils/theme';
import { Link } from 'react-router-dom';
import { urls } from '../utils/urls';
import JsHistory from './images/JsHistory.jpg';
import todos from './images/todos.jpg';
import hackertyper from './images/hackertyper.jpg';
import mortgageCalc from './images/mortgageCalc.jpg';
import memory from './images/memory.jpg';
import blog from './images/blog.jpg';

export const Apps = () => {
  return (
    <Div_Container>
      <Link_Styled to={urls.jsHistory}>
        <Div_Link imageUrl={JsHistory}>
          <Div_Heading>JS History</Div_Heading>
        </Div_Link>
      </Link_Styled>

      <Link_Styled to={urls.toDoAppRedux}>
        <Div_Link imageUrl={todos}>
          <Div_Heading>ToDo Redux</Div_Heading>
        </Div_Link>
      </Link_Styled>
      <Link_Styled to={urls.hackerTyper}>
        <Div_Link imageUrl={hackertyper}>
          <Div_Heading>HackerTyper</Div_Heading>
        </Div_Link>
      </Link_Styled>
      <Link_Styled to={urls.mortgageCalculator}>
        <Div_Link imageUrl={mortgageCalc}>
          <Div_Heading>HackerTyper</Div_Heading>
        </Div_Link>
      </Link_Styled>
      <Link_Styled to={urls.memoryGame}>
        <Div_Link imageUrl={memory}>
          <Div_Heading>Memory Game</Div_Heading>
        </Div_Link>
      </Link_Styled>
      <Link_Styled to={urls.blogApp}>
        <Div_Link imageUrl={blog}>
          <Div_Heading>Blog App</Div_Heading>
        </Div_Link>
      </Link_Styled>
    </Div_Container>
  );
};

type Props_Image = {
  imageUrl: string;
};

const Div_Link = styled.div<Props_Image>`
  margin-top: -50px;
  width: 200px;
  height: 200px;
  border: solid 3px ${colors.secondary};
  border-radius: 8px;
  margin: 30px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  :hover {
    box-shadow: 0px 0px 50px 3px ${colors.secondary};
  }
`;

const Link_Styled = styled(Link)`
  color: ${colors.secondary};
  text-decoration: none;
  &:hover {
    color: ${colors.secondary};
    text-shadow: 0 0 3px ${colors.secondary};
  }
`;

const Div_Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  @media (${mediaSize.mediaMobile}) {
    width: 300px;
    text-align: center;
  }
`;

const Div_Heading = styled.div`
  font-size: 30px;
  margin-top: -31px;
`;
