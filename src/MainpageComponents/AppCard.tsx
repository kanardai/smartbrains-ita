/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import github from './images/github.png';
import { Link } from 'react-router-dom';
import { colors } from '../utils/theme';

type Props = {
  appHeading: string;
  aHref: string;
  imgUrl: string;
  urlsLink: string;
};

export const AppCard = (p: Props) => {
  return (
    <div>
      <a href={p.aHref}>
        <Img_Github src={github} alt='github' />
      </a>
      <Link_Styled to={p.urlsLink}>
        <Div_Link imageUrl={p.imgUrl}>
          <Div_Heading>{p.appHeading}</Div_Heading>
        </Div_Link>
      </Link_Styled>
    </div>
  );
};

const Div_Heading = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  margin-top: -31px;
`;

const Img_Github = styled.img`
  position: relative;
  top: 25px;
  left: 220px;
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
  margin-top: -50px;
  width: 220px;
  height: 220px;
  border: solid 3px ${colors.secondary};
  border-radius: 8px;
  margin: 20px 30px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  :hover {
    box-shadow: 0px 0px 25px 0px ${colors.secondary};
  }
`;
