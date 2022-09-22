import styled from '@emotion/styled';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors, mediaSize } from '../utils/theme';
import { urls } from '../utils/urls';

export const Sidebar = () => {
  return (
    <Div_Sidebar>
      <Div_Navigation>
        <Div_NavItem>
          <A_Styled href={urls.mainpageHome}>home</A_Styled>
        </Div_NavItem>
        <Div_NavItem>
          <A_Styled href={urls.mainpageApps}>apps</A_Styled>
        </Div_NavItem>
        <Div_NavItem>
          <A_Styled href={urls.mainpageCv}>cv</A_Styled>
        </Div_NavItem>
        <Div_NavItem>
          <A_Styled href={urls.mainpageTechnologies}>technologies</A_Styled>
        </Div_NavItem>
      </Div_Navigation>
    </Div_Sidebar>
  );
};

const Div_Sidebar = styled.div`
  position: fixed;
  z-index: 1;
  background-color: ${colors.primaryDarker};
  @media (${mediaSize.mediaMobile}) {
    height: 40px;
    width: 100vw;
    border-bottom: 2px solid ${colors.secondary};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (${mediaSize.mediaLaptop}) {
    width: 40px;
    position: fixed;
    z-index: 1;
    left: 0;
    height: 100vh;
    border-right: 2px solid ${colors.secondary};
  }
  @media (${mediaSize.mediaDesktop}) {
    width: 80px;
    border-right: 3px solid ${colors.secondary};
    position: fixed;
    z-index: 1;
    left: 0;
    height: 100vh;
    border-right: 2px solid ${colors.secondary};
  }
`;

const Div_Navigation = styled.div`
  @media (${mediaSize.mediaMobile}) {
    margin-top: 0;
    flex-direction: row;
    transform: none;
  }
  margin-top: 5vh;
  display: flex;
  flex-direction: row-reverse;
  transform: rotate(-90deg);
`;

const Div_NavItem = styled.div`
  @media (${mediaSize.mediaMobile}) {
    font-size: 15px;
    padding: 0px 20px;
  }
  @media (${mediaSize.mediaLaptop}) {
    font-size: 20px;
    padding: 0px 25px;
  }

  @media (${mediaSize.mediaDesktop}) {
    font-size: 50px;
    padding: 0px 40px;
  }
`;

const A_Styled = styled.a`
  text-decoration: none;
  &:hover {
    color: ${colors.secondary};
    text-shadow: 0 0 10px ${colors.secondary};
  }
`;
