/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { LinkComponent } from '../components/LinkComponent';
import { concatUrl, urls } from '../utils/urls';
import { colors } from '../utils/theme';
import { Div_ContainerPage } from '../components/Components';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArticleContextProvider, ArticlesContext } from './BlogContextProvider';
import { useContext } from 'react';
import { useComponentDidMount } from '../utils/componentDidMount';

export const BlogApp = () => {
  return (
    <Div_BlogApp>
      <Helmet>
        <title>AD - Blog App</title>
      </Helmet>

      <div
        css={css`
          display: flex;
          height: 50px;
          width: 90%;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <H1_BlogApp>Blog App</H1_BlogApp>

        <Link_Styled to={urls.blogAppNewArticle}>INSERT ARTICLE</Link_Styled>
      </div>

      <ArticleContextProvider>
        <BlogAppList />
      </ArticleContextProvider>

      <LinkComponent to={urls.mainpage} color={colors.highlight}>
        GO HOME
      </LinkComponent>
    </Div_BlogApp>
  );
};

export const BlogAppList = () => {
  const logic = useContext(ArticlesContext);
  useComponentDidMount(() => {
    logic.getArticles();
  });

  return (
    <Div_ArticleList>
      {logic.loading && <Div_ErrorMessage>Loading...</Div_ErrorMessage>}
      {logic.errorMessage && (
        <Div_ErrorMessage>
          {logic.errorMessage}
          <Button_Ok onClick={() => logic.setErrorMessage(null)}>Ok</Button_Ok>
        </Div_ErrorMessage>
      )}
      {logic.articleList.map((article, index) => (
        <Div_Article key={index}>
          <H2_Title>{article.title}</H2_Title>
          <P_Article>{article.body.substring(0, 70) + '...'}</P_Article>
          <Link_Article to={concatUrl(article.urlSlug)}>
            read more →
          </Link_Article>
        </Div_Article>
      ))}
    </Div_ArticleList>
  );
};

const Div_BlogApp = styled(Div_ContainerPage)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Div_ArticleList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 40px 0px;
`;

const Div_Article = styled.div`
  border: solid 2px ${colors.secondary};
  border-radius: 20px;
  width: 200px;
  height: 250px;
  margin: 15px;
  padding: 15px;
`;

export const H2_Title = styled.div`
  color: ${colors.secondary};
  text-align: center;
  font-size: 30px;
`;

const P_Article = styled.p`
  color: ${colors.secondary};
  text-align: justify;
  margin-top: 18px;
  min-height: 120px;
`;

const Link_Styled = styled(Link)`
  color: ${colors.highlight};
  font-size: 20px;
  text-decoration: none;
  border-bottom: 6px solid ${colors.primary};
  &:hover {
    border-bottom: 6px solid ${colors.highlight};
  }
`;

const Link_Article = styled(Link)`
  color: ${colors.secondary};
  font-size: 15px;
  display: inline-block;
  text-decoration: none;
  border-bottom: 6px solid ${colors.primary};
  margin-top: 25px;
  &:hover {
    color: ${colors.highlight};
  }
`;

export const H1_BlogApp = styled.h1`
  color: ${colors.highlight};
  font-size: 30px;
  text-transform: uppercase;
`;

export const Div_ErrorMessage = styled.div`
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary};
  position: fixed;
  width: 300px;
  height: 300px;
  top: 105px;
  left: calc(50vw - (300px / 2));
  border: solid 10px ${colors.error};
  border-radius: 30px;
  color: ${colors.secondary};
  padding: 5px;
`;

export const Button_Ok = styled.button`
  margin-top: 30px;
  padding: 10px;
  border: solid 3px ${colors.secondary};
  border-radius: 10px;
  background-color: ${colors.primary};
  :active {
    border-color: ${colors.highlight};
  }
`;
