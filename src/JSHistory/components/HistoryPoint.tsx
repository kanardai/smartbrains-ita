import styled from '@emotion/styled';
import { history } from './history';
import { colors } from '../../utils/theme';
import {
  H2_Year,
  H3_Month,
  H4_Description,
  P_Article,
} from '../../components/Components';
import { css } from '@emotion/react';

export const HistoryPoint = () => {
  return (
    <Ul_List>
      {history.map((historyPoint, index) => (
        <Li_Item key={index}>
          <div>
            <H2_Year>{historyPoint.year}</H2_Year>
            <H3_Month>{historyPoint.month}</H3_Month>
            <H4_Description>{historyPoint.name}</H4_Description>
            <P_Article>{historyPoint.description}</P_Article>
          </div>
        </Li_Item>
      ))}
    </Ul_List>
  );
};

const Ul_List = styled.ul`
  background-color: ${colors.primary};
  display: flex;
  width: fit-content;
  list-style: none;
  padding-left: 50px;
  padding-right: 100px;
  margin: 0;
  color: ${colors.secondary};
`;

const Li_Item = styled.li`
  margin-left: 35px;
  min-width: 150px;
  text-align: center;
`;
