/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { colors, mediaSize } from '../utils/theme';
import { ArticleContextProvider, ArticlesContext } from './BlogContextProvider';
import { Div_ContainerPage } from '../components/Components';
import { Button_Ok, Div_ErrorMessage, H1_BlogApp } from './BlogApp';
import { LinkComponent } from '../components/LinkComponent';
import { urls } from '../utils/urls';
import MEditor from '@uiw/react-md-editor';
import { delay } from '../utils/delay';

export const BlogAppNewArticle = () => {
  return (
    <ArticleContextProvider>
      <NewArticleForm />
    </ArticleContextProvider>
  );
};

export const NewArticleForm = () => {
  const logic = useContext(ArticlesContext);
  const [urlAlert, setUrlAlert] = useState(false);
  const [symbolAlert, setSymbolAlert] = useState(false);

  const submit = async () => {
    if (logic.urlSymbol) {
      setSymbolAlert(true);
      await delay(1500);
      setSymbolAlert(false);
    }

    if (logic.compareUrl === true) {
      setUrlAlert(true);
      await delay(1500);
      setUrlAlert(false);
    }
    if (!logic.urlSymbol) {
      logic.submitHandler();
    }
  };

  return (
    <Div_NewArticleContainer>
      {logic.loading && <Div_ErrorMessage>Loading...</Div_ErrorMessage>}
      {logic.errorMessage && (
        <Div_ErrorMessage>
          {logic.errorMessage}
          <Button_Ok onClick={() => logic.setErrorMessage(null)}>OK</Button_Ok>
        </Div_ErrorMessage>
      )}
      <H1_BlogApp
        css={css`
          margin-bottom: 20px;
        `}
      >
        New Article
      </H1_BlogApp>

      <form>
        <div>
          <Input_Styled
            type='text'
            placeholder='Title'
            maxLength={10}
            value={logic.title}
            onChange={(e) => logic.setTitle(e.target.value)}
          />
        </div>
        <div>
          <Input_Styled
            type='text'
            placeholder='Url Slug'
            maxLength={15}
            value={logic.urlSlug}
            onChange={(e) => {
              logic.setUrlSlug(e.target.value);
              logic.compareUrls(e.target.value);
            }}
          />
        </div>
        {urlAlert && (
          <Div_AlertMessage>This Url Adress is not available.</Div_AlertMessage>
        )}
        {symbolAlert && (
          <Div_AlertMessage>
            only a-z, A-Z, 0-9 and symbol - are accepted for Url
          </Div_AlertMessage>
        )}

        <MEditor_Styled
          placeholder='Write an interesting article...'
          value={logic.body}
          onChange={(event) => event && logic.setBody(event)}
        >
          {' '}
        </MEditor_Styled>

        <Button_SubmitArticle type='button' onClick={submit}>
          submit
        </Button_SubmitArticle>
      </form>

      <LinkComponent to={urls.blogApp} color={colors.highlight}>
        go back
      </LinkComponent>
    </Div_NewArticleContainer>
  );
};

const Div_NewArticleContainer = styled(Div_ContainerPage)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input_Styled = styled.input`
  @media (${mediaSize.mediaMobile}) {
    width: 300px;
  }
  @media (${mediaSize.mediaLaptop}) {
    width: 700px;
  }
  height: 80px;
  background-color: ${colors.primary};
  color: ${colors.secondary};
  border: solid 2px ${colors.secondary};
  border-radius: 20px;
  text-align: center;
  font-size: 25px;
  margin: 10px;
  &:focus {
    outline: none;
    border-color: ${colors.highlight};
  }
`;

const MEditor_Styled = styled(MEditor)`
  @media (${mediaSize.mediaMobile}) {
    width: 300px;
  }
  @media (${mediaSize.mediaLaptop}) {
    width: 700px;
  }
  margin: 10px;
  background-color: ${colors.primary};
  border: solid 2px ${colors.secondary};
  border-radius: 20px;
  &:hover {
    border: solid 2px ${colors.highlight};
  }

  .w-md-editor-toolbar {
    border-radius: 20px 20px 0 0;
    background-color: ${colors.primary};
  }
  .w-md-editor-content {
    border-radius: 0 0 20px 20px;
    background-color: ${colors.primary};
  }
  .w-md-editor-preview {
    background-color: ${colors.primary};
  }
`;

const Button_SubmitArticle = styled.button`
  @media (${mediaSize.mediaMobile}) {
    width: 300px;
  }
  @media (${mediaSize.mediaLaptop}) {
    width: 700px;
  }
  height: 30px;
  background-color: ${colors.primary};
  border: solid 2px ${colors.secondary};
  border-radius: 10px;
  margin: 20px 0 40px 0;
  &:active {
    border: solid 5px ${colors.highlight};
  }
`;

const Div_AlertMessage = styled.div`
  position: absolute;
  color: ${colors.highlight};
  border: solid 5px ${colors.highlight};
  border-radius: 30px;
  width: 350px;
  height: 120px;
  font-size: 20px;
  background-color: ${colors.primary};
  z-index: 1;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
