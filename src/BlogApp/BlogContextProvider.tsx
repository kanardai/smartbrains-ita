import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  compareUrlsFetch,
  deleteArticleFetch,
  getArticleFetch,
  getArticlesFetch,
  postArticleFetch,
} from '../utils/apiEndpoints';
import { checkUrlSymbol } from '../utils/checkUrlSymbol';
import { delay } from '../utils/delay';
import { genericHookContextBuilder } from '../utils/genericHookContextBuilder';
import { concatUrl, urls } from '../utils/urls';

export type Article = {
  title: string;
  urlSlug: string;
  body: string;
};

const useLogicState = () => {
  const [articleList, setArticleList] = useState([] as Article[]);
  const [title, setTitle] = useState('');
  const [urlSlug, setUrlSlug] = useState('');
  const [body, setBody] = useState('');
  const [article, setArticle] = useState({} as Article);
  const [compareUrl, setCompareUrls] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const navigate = useNavigate();

  const getArticles = async () => {
    try {
      setLoading(true);
      const response = await getArticlesFetch();
      setArticleList(await response.json());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage('Unable to load Articles');
    }
  };

  const getArticle = async (slug: string) => {
    try {
      setLoading(true);
      const response = await getArticleFetch(slug);
      setArticle(await response.json());
      setLoading(false);
      return article;
    } catch (error) {
      setLoading(false);
      setErrorMessage('Unable to load Article');
    }
  };

  const postArticle = async (article: Article) => {
    try {
      setLoading(true);
      const response = await postArticleFetch(article);
      if (!response.ok) throw new Error(`response not ok: ${response.status}`);
      setTitle('');
      setUrlSlug('');
      setBody('');
      setCompareUrls(false);
      setLoading(false);
      navigate(concatUrl(urlSlug), { replace: true });
    } catch (error) {
      setLoading(false);
      setErrorMessage('Unable to post Article, TRY AGAIN');
    }
  };

  const compareUrls = async (urlString: string) => {
    try {
      setLoading(true);
      const response = await compareUrlsFetch(urlString);
      setCompareUrls(await response.json());
      setLoading(false);
    } catch (error: any) {
      setErrorMessage('No response from server');
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (slug: string) => {
    try {
      setLoading(true);
      const response = await deleteArticleFetch(slug);
      if (!response.ok) throw 'Server Error';
    } catch (error: any) {
      setErrorMessage(error);
      await delay(2000);
      setErrorMessage(null);
    } finally {
      setLoading(false);
    }
  };

  const urlSymbol = checkUrlSymbol(urlSlug);

  const submitHandler = async () => {
    if (!(body && title && urlSlug && !compareUrl)) return;

    try {
      await postArticle({
        title: title,
        urlSlug: urlSlug,
        body: body,
      });
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return {
    compareUrl,
    compareUrls,
    articleList,
    setArticleList,
    title,
    setTitle,
    urlSlug,
    setUrlSlug,
    body,
    setBody,
    submitHandler,
    urlSymbol,
    getArticles,
    getArticle,
    article,
    deleteArticle,
    loading,
    errorMessage,
    setErrorMessage,
  };
};

export const {
  ContextProvider: ArticleContextProvider,
  Context: ArticlesContext,
} = genericHookContextBuilder(useLogicState);
