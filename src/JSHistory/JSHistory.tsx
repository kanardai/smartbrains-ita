import styled from '@emotion/styled';
import { HistoryPoint } from './components/HistoryPoint';
import { MainPage } from './components/MainPage';
import { Helmet } from 'react-helmet';
import { colors, mediaSize } from '../utils/theme';
import arrow from '../MainpageComponents/images/arrow-thumb.svg';

export function JSHistory() {
  return (
    <Div_OuterWrapper>
      <Div_Container>
        <Helmet>
          <title>AD - JS History</title>
        </Helmet>
        <MainPage />
        <HistoryPoint />
      </Div_Container>
    </Div_OuterWrapper>
  );
}

const Div_Container = styled.div`
  display: flex;
  transform: rotate(90deg) translateY(-100vh);
  transform-origin: top left;
`;

const Div_OuterWrapper = styled.div`
  width: 100vh;
  height: 100vw;
  transform: rotate(-90deg) translateX(-100vh);
  transform-origin: top left;
  @media (${mediaSize.mediaMobile}) {
    overflow-x: scroll;
  }
  @media (${mediaSize.mediaLaptop}) {
    overflow-y: scroll;
    overflow-x: hidden;
    position: absolute;
    scrollbar-width: thin;
    scrollbar-color: ${colors.highlight} ${colors.primary};
    ::-webkit-scrollbar {
      width: 18px;
      background-color: ${colors.primary};
    }
    ::-webkit-scrollbar-thumb {
      background: url(${arrow});
      background-repeat: no-repeat;
      background-position: center;
    }
  }
`;
