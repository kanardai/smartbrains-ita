/** @jsxImportSource @emotion/react */
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import github from './images/github.png';
import { Link } from 'react-router-dom';
import { colors, mediaSize } from '../utils/theme';

type Props = {
  appHeading: string;
  aHref: string;
  imgUrl: string;
  urlsLink: string;
};

export const AppCard = (p: Props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <Div_Heading>
        {p.appHeading}
        <a href={p.aHref}>
          <Img_Github src={github} alt='github' />
        </a>
      </Div_Heading>

      <Link_Styled to={p.urlsLink}>
        <Div_Link imageUrl={p.imgUrl}></Div_Link>
      </Link_Styled>
    </div>
  );
};

const Div_Heading = styled.div`
  display: flex;
  justify-content: space-between;

  @media (${mediaSize.mediaMobile}) {
    width: 300px;
    font-size: 30px;
    margin-bottom: -10px;
    padding-top: 50px;
  }
  @media (${mediaSize.mediaLaptop}) {
    margin: 0 30px -40px 30px;
    width: 220px;
    font-size: 30px;
  }
  @media (${mediaSize.mediaDesktop}) {
    font-size: 30px;
  }
`;

const Img_Github = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Link_Styled = styled(Link)`
  color: ${colors.secondary};
  text-decoration: none;

  &:hover {
    color: ${colors.secondary};
    text-shadow: 0 0 1px ${colors.secondary};
  }
`;

type Props_Image = {
  imageUrl: string;
};

const Div_Link = styled.div<Props_Image>`
  @media (${mediaSize.mediaMobile}) {
    width: 300px;
    height: 300px;
  }
  @media (${mediaSize.mediaLaptop}) {
    width: 220px;
    height: 220px;
    margin: 30px;
    :hover {
      box-shadow: 0px 0px 25px 0px ${colors.secondary};
    }
  }

  border: solid 3px ${colors.secondary};
  border-radius: 8px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
`;
