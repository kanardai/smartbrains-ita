/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Div_ContainerPage } from '../components/Components';
import { LinkComponent } from '../components/LinkComponent';
import { colors, mediaSize } from '../utils/theme';
import { urls } from '../utils/urls';
import { ArticleContextProvider, ArticlesContext } from './BlogContextProvider';
import MEditor from '@uiw/react-md-editor';
import { Button_Ok, Div_ErrorMessage, H1_BlogApp } from './BlogApp';
import { delay } from '../utils/delay';

export const BlogArticle = () => {
  return (
    <ArticleContextProvider>
      <ActiveArticle />
    </ArticleContextProvider>
  );
};

const ActiveArticle = () => {
  const params = useParams();
  const logic = useContext(ArticlesContext);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const navigate = useNavigate();

  const deleteMessageHandler = async () => {
    setDeleteMessage(true);
    await delay(1500);
    setDeleteMessage(false);
    navigate(urls.blogApp, { replace: true });
  };

  useEffect(() => {
    logic.getArticle(params.articleSlug!);
  }, []);

  return (
    <Div_ContainerPage
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      {logic.loading && <Div_ErrorMessage>Loading...</Div_ErrorMessage>}
      {logic.errorMessage && (
        <Div_ErrorMessage>
          {logic.errorMessage}
          <Button_Ok>Ok</Button_Ok>
        </Div_ErrorMessage>
      )}
      <H1_BlogApp>{logic.article.title}</H1_BlogApp>
      <MEditor_Styled source={logic.article.body} />
      <Button_Delete
        onClick={() => {
          logic.deleteArticle(logic.article.urlSlug);
          deleteMessageHandler();
        }}
      >
        Delete Article
      </Button_Delete>
      {deleteMessage && (
        <Div_ErrorMessage>Article has been deleted</Div_ErrorMessage>
      )}
      <LinkComponent to={urls.blogApp} color={colors.highlight}>
        go back
      </LinkComponent>
    </Div_ContainerPage>
  );
};

const MEditor_Styled = styled(MEditor.Markdown)`
  background-color: ${colors.primary};
  text-align: justify;
  margin: 60px 30px 50px 30px;
`;


const Button_Delete = styled.button`
  @media (${mediaSize.mediaMobile}) {
    width: 300px;
  }
  @media (${mediaSize.mediaLaptop}) {
    width: 300px;
  }
  color: ${colors.highlight};
  background-color: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border: solid 2px ${colors.highlight};
  border-radius: 20px;
  margin-bottom: 30px;
  height: 50px;
  font-size: 25px;
  :active {
    border: solid 4px ${colors.highlight};
  }
`;
