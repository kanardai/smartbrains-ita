import { hackerCode } from './hackerCode';
import React, { useState } from 'react';
import { Div_ContainerPage } from '../components/Components';
import { LinkComponent } from '../components/LinkComponent';
import { urls } from '../utils/urls';
import { numberGenerator } from './numberGenerator';
import { colors } from '../utils/theme';
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Helmet } from 'react-helmet';

export const HackerTyper = () => {
  const [cursorPosition, setCursorPosition] = useState(0);
  const [popUp, setPopUp] = useState(false);

  const enterPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setPopUp(!popUp);
    }
  };

  return (
    <Div_ContainerPage>
      <Helmet>
        <title>AD - HackerTyper</title>
      </Helmet>
      <Div_BlinkingText>
        COSMIC SECRET INFORMATION ------------------&gt;&gt;&gt;&gt; Press ENTER
        to CONFIRMATION
      </Div_BlinkingText>
      {popUp && <Div_PopUp>Access Denied</Div_PopUp>}
      <Textarea_styled
        value={hackerCode.slice(0, cursorPosition)}
        onChange={() => setCursorPosition(cursorPosition + numberGenerator())}
        spellCheck={false}
        onKeyDown={enterPress}
      ></Textarea_styled>
      <Div_GoHome>
        <LinkComponent to={urls.mainpage} color={colors.highlight}>
          GO HOME
        </LinkComponent>
      </Div_GoHome>
    </Div_ContainerPage>
  );
};

const Textarea_styled = styled.textarea`
  width: 90vw;
  min-height: 75vh;
  font-family: 'Chakra Petch', sans-serif;
  color: ${colors.highlight};
  background-color: ${colors.primary};
  border: none;
  margin-top: 10px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const blink = keyframes`
  0% {
    color: ${colors.highlight};
  }
  100% {
    color: transparent;
  }

`;

const Div_BlinkingText = styled.div`
  font-family: 'Chakra Petch', sans-serif;
  text-align: left;
  color: ${colors.highlight};
  animation: ${blink} 1s ease-in-out infinite;
`;

const Div_PopUp = styled.div`
  position: fixed;
  color: ${colors.highlight};
  border: solid 5px ${colors.highlight};
  border-radius: 30px;
  width: 300px;
  height: 180px;
  font-size: 3rem;
  background-color: ${colors.primary};
  z-index: 1;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 25vh;
  display: flex;
  align-items: center;
  font-family: 'Chakra Petch', sans-serif;
`;

const Div_GoHome = styled.div`
  text-align: center;
  margin-top: 20px;
`;
