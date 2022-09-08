import { colors } from '../utils/theme';
import styled from '@emotion/styled';

export const Div_ContainerPage = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  background-color: ${colors.primary};
  text-align: center;
  padding: 40px;
`;

export const H2_Year = styled.h2`
  font-size: 50px;
  color: ${colors.highlight};
  padding-top: 50px;
  padding-bottom: 10px;
  border-bottom: 5px solid ${colors.highlight};
`;

export const H3_Month = styled.h3`
  padding-top: 20px;
  font-size: 30px;
  color: ${colors.highlight};
  padding-top: -30px;
`;

export const H4_Description = styled.h4`
  padding-top: 10px;
  font-size: 18px;
  color: ${colors.highlight};
  min-height: 90px;
`;

export const P_Article = styled.p`
  padding-top: 10px;
  font-size: 15px;
  color: ${colors.secondary};
`;
