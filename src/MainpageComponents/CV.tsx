/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors, mediaSize } from '../utils/theme';
import foto from './foto.jpg';
import { cvData } from './cvData';

export const CV = () => {
  return (
    <Div_Container>
      <Img_Face />

      <Table_Styled>
        <tbody>
          {cvData.map((data, index) => (
            <TableTr
              key={index}
              index={index}
              col1={data.col1}
              col2={data.col2}
              cssStyle={data.cssStyle}
            />
          ))}
        </tbody>
      </Table_Styled>
    </Div_Container>
  );
};

type Props = {
  cssStyle?: string;
  col1: string;
  col2: string;
  index: number;
};

export const TableTr = (p: Props) => {
  return (
    <Tr_Styled>
      <Td_Col1 cssStyle={p.cssStyle}>{p.col1}</Td_Col1>
      <Td_Col2>
        {p.col2}
        <Tr_Empty />
      </Td_Col2>
    </Tr_Styled>
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
type Props_Td_Styled = {
  cssStyle?: string;
};
const Td_Col1 = styled.td<Props_Td_Styled>`
  font-size: smaller;
  color: ${(props) => (props.cssStyle ? props.cssStyle : colors.highlight)};
  width: 33%;
`;
const Td_Col2 = styled.td`
  font-size: smaller;
  width: 67%;
`;
