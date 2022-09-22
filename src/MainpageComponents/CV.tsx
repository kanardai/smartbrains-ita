/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors, mediaSize } from '../utils/theme';
import foto from './foto.jpg';
import { cvData } from './cvData';

const pdfCV = require('./images/CV_en_2209.pdf');

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
          <tr>
            <td></td>
            <td>
              <a
                href={pdfCV}
                target='_blank'
                css={css`
                  color: ${colors.highlight};
                  text-decoration: none;
                  font-size: smaller;
                  &:hover {
                    text-shadow: 0 0 2px ${colors.highlight};
                  }
                `}
              >
                Download CV
              </a>
            </td>
          </tr>
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
      <Td_Col2>{p.col2}</Td_Col2>
    </Tr_Styled>
  );
};

const Div_Container = styled.div`
  border: solid 4px ${colors.secondary};
  border-radius: 20px;
  box-shadow: 0px 0px 70px 3px ${colors.secondary};
  text-align: center;
  width: 430px;
  height: 430px;
  @media (${mediaSize.mediaDesktop}) {
    transform: scale(2);
  }
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
  width: 400px;
  margin: 20px 20px;
`;

const Tr_Styled = styled.tr`
  line-height: 23px;
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
