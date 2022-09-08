import { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { urls } from '../utils/urls';
import { colors, mediaSize } from '../utils/theme';
import React from 'react';
import { LinkComponent } from '../components/LinkComponent';
import { Div_ContainerPage } from '../components/Components';
import { Helmet } from 'react-helmet';

const Button = styled.button`
  height: 100px;
  width: 100px;
  background-color: ${colors.primary};
  border: 5px solid ${colors.secondary};
  border-radius: 20px;
  margin: 10px;
  font-size: 50px;  
  color: ${colors.secondary};
  &:active {
    border: 7px solid ${colors.secondary};
  }
  &:hover {
    border-color: ${colors.highlight};
  }
`;

const Div_Number = styled.div`
  height: 100px;
  width: 100px;
  color: ${colors.secondary};
  font-size: 50px;
  border: 5px solid ${colors.secondary};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

type Props = {};
type State = {
  count: number;
};

export class TwoButtons extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <Div_ContainerPage
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        `}
      >
        <Helmet>
          <title>AD - Two Buttons</title>
        </Helmet>

        <div
          css={css`
            display: flex;
            @media (${mediaSize.mediaMobile}) {
              flex-direction: column;
            }
            margin-bottom: 40px;
          `}
        >
          <Button
            onClick={() => {
              this.setState((prevstate) => ({ count: prevstate.count - 1 }));
            }}
          >
            -
          </Button>
          <Div_Number>{this.state.count}</Div_Number>
          <Button
            onClick={() => {
              this.setState((prevstate) => ({ count: prevstate.count + 1 }));
            }}
          >
            +
          </Button>
        </div>

        <LinkComponent to={urls.mainpage} color={colors.highlight}>
          GO HOME
        </LinkComponent>
      </Div_ContainerPage>
    );
  }
}
