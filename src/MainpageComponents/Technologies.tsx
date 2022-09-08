import styled from '@emotion/styled';
import bulbOff from './bulbOff.svg';
import bulbOn from './bulbOn.svg';
import { useState } from 'react';
import { colors, mediaSize } from '../utils/theme';

export const Technologies = () => {
  const [bulbOn, setBulbOn] = useState(false);

  return (
    <Div_Bulb>
      {bulbOn && (
        <Div_Technologies>
          <Div_TechItem>React</Div_TechItem>
          <Div_TechItem>TypeScript</Div_TechItem>
          <Div_TechItem>CSS</Div_TechItem>
          <Div_TechItem>HTML</Div_TechItem>
          <Div_TechItem>GitLab</Div_TechItem>
        </Div_Technologies>
      )}

      <Div_BulbLight bulbOn={bulbOn}>
        <Button_Bulb
          onClick={() => {
            setBulbOn(!bulbOn);
          }}
        ></Button_Bulb>
      </Div_BulbLight>
      <div>Click on the Bulb to see used technologies.. </div>
    </Div_Bulb>
  );
};

const Div_Bulb = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  @media (${mediaSize.mediaMobile}) {
    transform: scale(0.8);
    margin-top: 20px;
    text-align: center;
  }
`;

type Props_BulbOn = {
  bulbOn: boolean;
};
const Div_BulbLight = styled.div<Props_BulbOn>`
  width: 300px;
  height: 400px;
  background-image: url(${bulbOff});
  background-size: cover;
  background-image: url(${bulbOn});
  background: ${(props) => !props.bulbOn && 'transparent'};
`;
const Button_Bulb = styled.div`
  width: 300px;
  height: 400px;
  background-image: url(${bulbOff});
  background-size: cover;
`;

const Div_Technologies = styled.div`
  display: flex;
  justify-content: center;
`;

const Div_TechItem = styled.div`
  width: 100px;
  text-align: right;
  position: absolute;
  top: 40vh;
  text-shadow: 0 0 1px ${colors.secondary}, 0 0 20px ${colors.secondary},
    0 0 30px ${colors.secondary}, 0 0 40px ${colors.secondary};
  filter: brightness(120%);
  :nth-child(1) {
    transform: rotate3d(0, 0, 1, 30deg) translateX(-200px);
  }
  :nth-child(2) {
    transform: rotate3d(0, 0, 1, 60deg) translateX(-200px);
  }
  :nth-child(3) {
    transform: rotate3d(0, 0, 1, 90deg) translateX(-200px);
  }
  :nth-child(4) {
    transform: rotate3d(0, 0, 1, 120deg) translateX(-200px);
  }
  :nth-child(5) {
    transform: rotate3d(0, 0, 1, 150deg) translateX(-200px);
  }

  @media (${mediaSize.mediaMobile}) {
    top: 10vh;
  }
`;
