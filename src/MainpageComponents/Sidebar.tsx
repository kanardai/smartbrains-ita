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
          <A_Styled href={urls.mainpageTechnologies}>technologies</A_Styled>
        </Div_NavItem>
        <Div_NavItem>
          <A_Styled href={urls.mainpageCv}>cv</A_Styled>
        </Div_NavItem>
      </Div_Navigation>
    </Div_Sidebar>
  );
};

const Div_Sidebar = styled.div`
  @media (${mediaSize.mediaLaptop}) {
    width: 30px;
  }
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;

  height: 100vh;
  border-right: 2px solid ${colors.secondary};
  background-color: ${colors.primaryDarker};
  @media (${mediaSize.mediaMobile}) {
    width: 22px;
  }
`;

const Div_Navigation = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: row-reverse;
  transform: rotate(-90deg);
`;

const Div_NavItem = styled.div`
  font-size: 20px;
  padding: 0px 30px;
`;

const A_Styled = styled.a`
  text-decoration: none;
`;
