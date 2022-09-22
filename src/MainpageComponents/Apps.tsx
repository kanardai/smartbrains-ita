/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { mediaSize } from '../utils/theme';
import { AppCard } from './AppCard';
import { appCardData } from './appCardData';

export const Apps = () => {
  return (
    <Div_Container>
      {appCardData.map((app, index) => (
        <AppCard
          key={index}
          appHeading={app.appHeading}
          aHref={app.aHref}
          urlsLink={app.urlsLink}
          imgUrl={app.imgUrl}
        />
      ))}
    </Div_Container>
  );
};

const Div_Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  @media (${mediaSize.mediaMobile}) {
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5vh 0;
  }
  @media (${mediaSize.mediaDesktop}) {
    transform: scale(2);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
`;
