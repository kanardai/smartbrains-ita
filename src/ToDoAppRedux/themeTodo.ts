/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { colors, mediaSize } from '../utils/theme';

type Button_Props = {
  complete?: boolean;
  highlight?: string;
  secondary?: string;
};

export const Btn_Style = styled.button<Button_Props>`
  height: 45px;
  width: 80px;
  background-color: ${colors.primary};
  color: ${colors.secondary};
  color: ${(props) => (props.complete ? props.highlight : props.secondary)};
  border: none;

  &:hover {
    color: ${colors.highlight};
    font-size: large;
  }
`;

export const Btn_Style_Basic = styled.button`
  width: 80px;
  height: 45px;
  background-color: ${colors.primary};
  color: ${colors.secondary};

  border: none;

  &:hover {
    color: ${colors.highlight};
    font-size: large;
  }
`;
export const Div_TodoItem = styled.div`
  @media (${mediaSize.mediaMobile}) {
    width: 300px;
  }
  @media (${mediaSize.mediaLaptop}) {
    width: 700px;
  }
  background-color: ${colors.primary};
  display: flex;
  align-items: center;

  border-bottom: solid 1px ${colors.secondary};
  height: 80px;
  justify-content: space-between;
`;
