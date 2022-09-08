/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors, mediaSize } from '../utils/theme';
import foto from './foto.jpg';

export const CV = () => {
  return (
    <Div_Container>
      <Img_Face />

      <Table_Styled>
        <tbody>
          <Tr_Styled>
            <Td_Col1>Name</Td_Col1>
            <Td_Col2>Aneta D.</Td_Col2>
          </Tr_Styled>

          <Tr_Empty />

          <Tr_Styled>
            <Td_Col1>Languages</Td_Col1>
            <Td_Col2>English B1, German B2</Td_Col2>
          </Tr_Styled>

          <Tr_Empty />

          <Tr_Styled>
            <Td_Col1>Education</Td_Col1>
            <Td_Col2>University of West Bohemia</Td_Col2>
          </Tr_Styled>
          <Tr_Empty />
          <Tr_Styled>
            <Td_Col1
              css={css`
                color: ${colors.secondary};
              `}
            >
              Bachelor Degree
            </Td_Col1>
            <Td_Col2>Computational Modeling in Mechanics</Td_Col2>
          </Tr_Styled>
          <Tr_Styled>
            <Td_Col1 />
            <Td_Col2>Faculty of Applied Sciences</Td_Col2>
          </Tr_Styled>
          <Tr_Empty />
          <Tr_Styled>
            <Td_Col1
              css={css`
                color: ${colors.secondary};
              `}
            >
              Master Degree
            </Td_Col1>
            <Td_Col2>Production and Logistics Management</Td_Col2>
          </Tr_Styled>
          <Tr_Styled>
            <Td_Col1 />
            <Td_Col2>Faculty of Mechanical Engineering</Td_Col2>
          </Tr_Styled>
          <Tr_Empty />
          <Tr_Styled>
            <Td_Col1>Work Experinces</Td_Col1>
            <Td_Col2 />
          </Tr_Styled>
          <Tr_Empty />
          <Tr_Styled>
            <Td_Col1
              css={css`
                color: ${colors.secondary};
              `}
            >
              2016-2022
            </Td_Col1>
            <Td_Col2>Air surveillance and NATO Air Policing</Td_Col2>
          </Tr_Styled>
          <Tr_Styled>
            <Td_Col1 />
            <Td_Col2>Czech Air Force</Td_Col2>
          </Tr_Styled>
          <Tr_Empty />
          <Tr_Styled>
            <Td_Col1
              css={css`
                color: ${colors.secondary};
              `}
            >
              2022
            </Td_Col1>
            <Td_Col2>Trainee program IT Absolvent</Td_Col2>
          </Tr_Styled>
          <Tr_Styled>
            <Td_Col1 />
            <Td_Col2>Smartbrains solutions s.r.o.</Td_Col2>
          </Tr_Styled>
        </tbody>
      </Table_Styled>
    </Div_Container>
  );
};

const Div_Container = styled.div`
  /* @media (${mediaSize.mediaLaptop}) { */
  width: 400px;
  height: 400px;
  border: solid 4px ${colors.secondary};
  border-radius: 20px;
  box-shadow: 0px 0px 70px 3px ${colors.secondary};
  text-align: center;
  /* } */
  @media (${mediaSize.mediaMobile}) {
    transform: scale(0.7);
  }
`;

const Img_Face = styled.img`
  width: 150px;
  height: 150px;
  border: solid 4px ${colors.secondary};
  border-radius: 50%;
  margin-top: -75px;
  background-image: url(${foto});
  background-size: cover;
`;

const Table_Styled = styled.table`
  text-align: left;
  width: 350px;
  margin: 10px 20px;
`;
const Tr_Styled = styled.tr`
  line-height: 17px;
`;
const Tr_Empty = styled.tr`
  height: 6px;
`;

const Td_Col1 = styled.td`
  font-size: smaller;
  color: ${colors.highlight};
  width: 33%;
`;
const Td_Col2 = styled.td`
  font-size: smaller;
  width: 67%;
`;
