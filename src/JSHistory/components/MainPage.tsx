/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

import { keyframes } from '@emotion/react';
import { colors, mediaSize } from '../../utils/theme';
import { urls } from '../../utils/urls';
import { LinkComponent } from '../../components/LinkComponent';
import backgroundImg from '../images/layered-wave-one.svg';

import { css } from '@emotion/react';

const javascript_anim = require('../images/javascript_anim.gif');

export const MainPage = () => {
  return (
    <Div_Slide_One>
      <Img_Logo src={javascript_anim} alt='javascript gif' />
      <Div_Header>
        <h1
          css={css`
            color: ${colors.primary};
          `}
        >
          Explore Javascript history
        </h1>
        <P_Sliding>slide right</P_Sliding>
        <LinkComponent to={urls.mainpage} color={colors.primary}>
          GO HOME
        </LinkComponent>
      </Div_Header>
    </Div_Slide_One>
  );
};

const Img_Logo = styled.img`
  @media (${mediaSize.mediaMobile}) {
    width: 300px;
  }
  @media (${mediaSize.mediaLaptop}) {
    width: 500px;
    margin-left: -20%;
  }

  padding: 60px 0;
  position: center;
`;

const Div_Header = styled.div`
  @media (${mediaSize.mediaMobile}) {
    width: 300px;
    flex-direction: column;
  }
  @media (${mediaSize.mediaLaptop}) {
    width: 500px;
    margin-left: -20%;
  }
  text-align: center;

  margin: 0;
`;

const slidingText = keyframes`
  0% {
    font-size: normal;
  }
  65% {
    font-size: 25px;
  }
  100% {
    font-size: normal;
  }
`;

const P_Sliding = styled.p`
  color: ${colors.primary};
  margin: 40px 0;
  height: 50px;
  animation: ${slidingText} 2s ease infinite;
`;

const Div_Slide_One = styled.div`
  background-image: url(${backgroundImg});
  background-position: center;

  background-size: cover;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
