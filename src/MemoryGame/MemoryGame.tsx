import styled from '@emotion/styled';
import { Div_ContainerPage } from '../components/Components';
import { colors } from '../utils/theme';
import { mediaSize } from '../utils/theme';
import { useState } from 'react';
import { urls } from '../utils/urls';
import { LinkComponent } from '../components/LinkComponent';
import { Helmet } from 'react-helmet';
import { H3_Month } from '../components/Components';
import { shuffleArray } from '../utils/shuffleArray';
import pexeso01 from './images/pexeso01.svg';
import pexeso02 from './images/pexeso02.svg';
import pexeso03 from './images/pexeso03.svg';
import pexeso04 from './images/pexeso04.svg';
import pexeso05 from './images/pexeso05.svg';
import pexeso06 from './images/pexeso06.svg';
import pexeso07 from './images/pexeso07.svg';
import pexeso08 from './images/pexeso08.svg';
import { generateId } from '../utils/generateId';

type Card = {
  imgSrc: string;
  id: string;
  active: boolean;
};

const cardImages = [
  pexeso01,
  pexeso02,
  pexeso03,
  pexeso04,
  pexeso05,
  pexeso06,
  pexeso07,
  pexeso08,
];

const cardList = [...cardImages, ...cardImages].map((image) => {
  return {
    imgSrc: image,
    id: generateId(),
    active: false,
  };
});

const cards = shuffleArray(cardList);

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(undefined), ms));

export const MemoryGame = () => {
  const [cardData, setCardData] = useState(cards);
  const [choiceOne, setChoiceOne] = useState<string | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<string | null>(null);

  const handleClick = async (card: Card) => {
    if (choiceOne === null && !card.active) {
      setChoiceOne(card.id);
    } else if (card.id !== choiceOne && choiceTwo === null && !card.active) {
      setChoiceTwo(card.id);
      compareCards(card);
      await delay(1500);
      turnCardsBack();
    }
  };

  const compareCards = (card: Card) => {
    setCardData((prev) => {
      const firstCard = prev.find((element) => element.id === choiceOne);
      const secondCard = prev.find((element) => element.id === card.id);

      if (firstCard && secondCard && firstCard.imgSrc === secondCard.imgSrc) {
        return prev.map((prevCard) => {
          if (prevCard.id === firstCard.id || prevCard.id === secondCard.id) {
            return { ...prevCard, active: true };
          }
          return prevCard;
        });
      }
      return prev;
    });
  };

  const turnCardsBack = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  return (
    <Div_ContainerPage>
      <Helmet>
        <title>AD - Memory Game</title>
      </Helmet>
      <H3_Month>Memory Game</H3_Month>
      <Div_PexesoField>
        {cardData.map((card) => (
          <Div_Card
            key={card.id}
            onClick={() => handleClick(card)}
            activate={
              card.id === choiceOne || card.id === choiceTwo || card.active
            }
          >
            <Div_Card_Back></Div_Card_Back>
            <Div_Card_Face imgSrc={card.imgSrc}></Div_Card_Face>
          </Div_Card>
        ))}
        {cardData.filter((card) => !card.active).length < 1 && (
          <Div_PopUp> you are borec! </Div_PopUp>
        )}
      </Div_PexesoField>
      <LinkComponent to={urls.mainpage} color={colors.highlight}>
        GO HOME
      </LinkComponent>
    </Div_ContainerPage>
  );
};

const Div_PexesoField = styled.div`
  @media (${mediaSize.mediaMobile}) {
    grid-template-columns: repeat(2, 150px);
    grid-template-rows: repeat(8, 150px);
  }
  @media (${mediaSize.mediaLaptop}) {
    grid-template-columns: repeat(4, 150px);
    grid-template-rows: repeat(4, 150px);
  }
  justify-content: center;
  display: grid;
  align-content: center;
  margin: 40px 0;
`;

type Props_Image = {
  imgSrc: string;
};

type Props_Card = {
  activate: boolean;
};

const Div_Card = styled.div<Props_Card>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transform-style: preserve-3d;
  transition: all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.35);
  transform: ${(props) =>
    props.activate ? 'rotateY(0deg)' : 'rotateY(180deg)'};
`;
const Div_Card_Face = styled.div<Props_Image>`
  height: 130px;
  width: 130px;
  background-image: url(${(props) => props.imgSrc});
  background-size: cover;
  border: solid 3px ${colors.highlight};
  border-radius: 15px;
  position: absolute;
  backface-visibility: hidden;
`;

const Div_Card_Back = styled.div`
  height: 130px;
  width: 130px;
  background-color: ${colors.primary};
  border: solid 3px ${colors.secondary};
  border-radius: 15px;
  position: absolute;
`;

const Div_PopUp = styled.div`
  @media (${mediaSize.mediaMobile}) {
    width: 250px;
    font-size: 2rem;
  }
  @media (${mediaSize.mediaLaptop}) {
    width: 400px;
    font-size: 3rem;
  }
  position: absolute;
  color: ${colors.highlight};
  border: solid 5px ${colors.highlight};
  border-radius: 30px;
  height: 180px;
  background-color: ${colors.primary};
  z-index: 1;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: calc(50vh - 90px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
