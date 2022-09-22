import styled from '@emotion/styled';
import bulbOff from './images/bulbOff.svg';
import bulbOn from './images/bulbOn.svg';
import { useState } from 'react';
import { colors, mediaSize } from '../utils/theme';
import { useWindowResizer } from '../utils/hookWindowResizer';

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
          <Div_TechItem>Redux</Div_TechItem>
        </Div_Technologies>
      )}

      <Div_BulbLight bulbOn={bulbOn}>
        <Button_Bulb
          onMouseEnter={() => {
            setBulbOn((prevState) => !prevState);
          }}
          onMouseLeave={() => {
            setBulbOn(false);
          }}
          onClick={() => {
            setBulbOn((prevState) => !prevState);
          }}
        ></Button_Bulb>
      </Div_BulbLight>
      <div>
        {useWindowResizer().width < mediaSize.mobile
          ? 'Click on'
          : 'Hover over'}{' '}
        the Bulb to see used technologies..
      </div>
    </Div_Bulb>
  );
};

const Div_Bulb = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  @media (${mediaSize.mediaLaptop}) {
    margin-top: 15vh;
    text-align: center;
  }
  @media (${mediaSize.mediaMobile}) {
    transform: scale(0.8);
    margin-top: 15vh;
    text-align: center;
  }
  @media (${mediaSize.mediaDesktop}) {
    transform: scale(2);
  }
`;

type Props_BulbOn = {
  bulbOn: boolean;
};
const Div_BulbLight = styled.div<Props_BulbOn>`
  width: 300px;
  height: 400px;
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
  text-shadow: 0 0 1px ${colors.secondary}, 0 0 15px ${colors.secondary};
  filter: brightness(120%);
  @media (${mediaSize.mediaLaptop}) {
    top: 40vh;
    :nth-of-type(1) {
      transform: rotate3d(0, 0, 1, 26deg) translateX(-200px);
    }
    :nth-of-type(2) {
      transform: rotate3d(0, 0, 1, 53deg) translateX(-200px);
    }
    :nth-of-type(3) {
      transform: rotate3d(0, 0, 1, 81deg) translateX(-200px);
    }
    :nth-of-type(4) {
      transform: rotate3d(0, 0, 1, 106deg) translateX(-200px);
    }
    :nth-of-type(5) {
      transform: rotate3d(0, 0, 1, 131deg) translateX(-200px);
    }
    :nth-of-type(6) {
      transform: rotate3d(0, 0, 1, 156deg) translateX(-200px);
    }
  }

  @media (${mediaSize.mediaMobile}) {
    top: 10vh;
    :nth-of-type(1) {
      transform: rotate3d(0, 0, 1, 55deg) translateX(-200px);
    }
    :nth-of-type(2) {
      transform: rotate3d(0, 0, 1, 70deg) translateX(-200px);
    }
    :nth-of-type(3) {
      transform: rotate3d(0, 0, 1, 85deg) translateX(-200px);
    }
    :nth-of-type(4) {
      transform: rotate3d(0, 0, 1, 100deg) translateX(-200px);
    }
    :nth-of-type(5) {
      transform: rotate3d(0, 0, 1, 115deg) translateX(-200px);
    }
    :nth-of-type(6) {
      transform: rotate3d(0, 0, 1, 130deg) translateX(-200px);
    }
  }

  @media (${mediaSize.mediaDesktop}) {
    font-size: 30px;
    top: 70px;
    width: 150px;
    :nth-of-type(1) {
      transform: rotate3d(0, 0, 1, 15deg) translateX(-220px);
    }
    :nth-of-type(2) {
      transform: rotate3d(0, 0, 1, 45deg) translateX(-220px);
    }
    :nth-of-type(3) {
      transform: rotate3d(0, 0, 1, 75deg) translateX(-220px);
    }
    :nth-of-type(4) {
      transform: rotate3d(0, 0, 1, 105deg) translateX(-220px);
    }
    :nth-of-type(5) {
      transform: rotate3d(0, 0, 1, 135deg) translateX(-220px);
    }
    :nth-of-type(6) {
      transform: rotate3d(0, 0, 1, 165deg) translateX(-220px);
    }
  }
`;
