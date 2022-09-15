import { Article } from '../BlogApp/BlogContextProvider';

const apiRoot = `${process.env.REACT_APP_HTTP_FILTER_URL}/`;

export const apiEndpoints = {
  articles: apiRoot + 'articles/',
  articlesCompare: apiRoot + 'articles/compare',
};

export const services = {
  articles: {
    deleteArticleFetch: (slug: string) =>
      fetch(apiEndpoints.articles + slug, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }),
    postArticleFetch: (article: Article) =>
      fetch(apiEndpoints.articles, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      }),
    getArticlesFetch: async () => {
      const response = await fetch(apiEndpoints.articles);
      if (!response.ok) throw new Error('Unable to load Articles');
      const data = (await response.json()) as Article[];
      return data;
    },
    getArticleFetch: async (slug: string) => {
      const response = await fetch(apiEndpoints.articles + slug);
      if (!response.ok) throw new Error('Unable to load Article');
      const data = (await response.json()) as Article;
      return data;
    },
    compareUrlsFetch: async (urlString: string) => {
      const response = await fetch(
        apiEndpoints.articlesCompare + '?slug=' + urlString
      );
      if (!response.ok) throw new Error();
      return response;
    },
  },
};

// export const deleteArticleFetch = (slug: string) =>
//   fetch(apiEndpoints.articles + slug, {
//     method: 'DELETE',
//     headers: { 'Content-Type': 'application/json' },
//   });

// export const postArticleFetch = (article: Article) =>
//   fetch(apiEndpoints.articles, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(article),
//   });

// export const getArticlesFetch = async () => {
//   const response = await fetch(apiEndpoints.articles);
//   if (!response.ok) throw new Error('Unable to load Articles');
//   const data = (await response.json()) as Article[];
//   return data;
// };

// export const getArticleFetch = async (slug: string) => {
//   const response = await fetch(apiEndpoints.articles + slug);
//   if (!response.ok) throw new Error('Unable to load Article');
//   const data = (await response.json()) as Article;
//   return data;
// };

// export const compareUrlsFetch = async (urlString: string) => {
//   const response = await fetch(
//     apiEndpoints.articlesCompare + '?slug=' + urlString
//   );
//   if (!response.ok) throw new Error();
//   return response;
// };
