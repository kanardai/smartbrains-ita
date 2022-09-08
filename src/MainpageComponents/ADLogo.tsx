import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { colors, mediaSize } from '../utils/theme';

const randomRGB = () => {
  return Math.round(Math.random() * 255);
};

export const ADLogo = () => {
  const [color, setcolor] = useState('rgb(143, 0, 255)');

  useEffect(() => {
    const intervalId = setInterval(
      () => setcolor(`rgb(${randomRGB()},${randomRGB()},${randomRGB()})`),
      1500
    );
    return () => clearInterval(intervalId);
  }, []);
  return (
    <Div_Logo>
      <Div_AD>AD</Div_AD>
      <Div_AD2 rgbColor={color}>AD</Div_AD2>
      <Div_React>React</Div_React>
      <Div_Dev>Developer</Div_Dev>
    </Div_Logo>
  );
};

const Div_Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  background-color: ${colors.primaryDarker};
  box-shadow: 0px 0px 100px 3px ${colors.secondary};
  filter: brightness(120%);
  border: solid 4px ${colors.secondary};
  border-radius: 10px;
  @media (${mediaSize.mediaMobile}) {
    margin-left: 30px;
    transform: scale(0.6);
  }
`;

const Div_AD = styled.div`
  margin-top: -40px;
  font-size: 200px;
  z-index: 1;
`;

type Props_RColor = {
  rgbColor: string;
};
const Div_AD2 = styled.div<Props_RColor>`
  color: ${(props) => props.rgbColor};
  transition: 2s linear;
  margin-top: -240px;
  margin-bottom: 120px;
  height: 75px;
  overflow: hidden;
  font-size: 200px;
  z-index: 2;
`;
const Div_React = styled.div`
  font-size: 50px;
  padding-left: 15px;
  color: ${colors.react};
  letter-spacing: 25px;
`;
const Div_Dev = styled.div`
  font-size: 26px;
  letter-spacing: 13px;
  padding-left: 6px;
`;
