import cors from 'cors';
import express from 'express';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express'
import swaggerData from '../swagger.json'

const app = express();
const port = 1234;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerData))

type Article = {
  title: string;
  urlSlug: string;
  body: string;
};

const readArticles = (): Article[] => {
  const rawData = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');
  return JSON.parse(rawData).articles;
};

const writeArticles = (articleArr: Article[]) => {
  fs.writeFileSync(
    `${__dirname}/data.json`,
    JSON.stringify({ articles: articleArr })
  );
};

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get('/articles', (req, res) => {
  try {
    const articleList = readArticles();

    res.send(articleList);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/articles/compare', (req, res) => {
  try {
    const articleList = readArticles();
    const urlsList = articleList.map((item) => item.urlSlug);
    const receivedUrl = req.query.slug;
    const compareUrls = urlsList.find((element) => element === receivedUrl);
    res.send(Boolean(compareUrls));
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/articles/:urlSlug', (req, res) => {
  try {
    const articles = readArticles();
    const article = articles.find(
      (item) => item.urlSlug === req.params.urlSlug
    );
    if (article) {
      res.send(article);
    } else {
      res.status(404).send('Article not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/articles', (req, res) => {
  try {
    const articles = readArticles();
    const newArticle = req.body;
    const articleError = [];

    if (!newArticle.title) articleError.push('Title');
    if (!newArticle.urlSlug) articleError.push('Url Slug');
    if (!newArticle.body) articleError.push('Body');

    if (articleError.length > 0) {
      res.status(400).send(`Missing Inputs: ${articleError.join(', ')}`);
    } else {
      writeArticles([...articles, newArticle]);
      res.send(true);
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

app.delete('/articles/:urlSlug', (req, res) => {
  try {
    const articles = readArticles();
    const articleIndex = articles.findIndex(
      (item) => item.urlSlug === req.params.urlSlug
    );
    if (articleIndex > -1) {
      articles.splice(articleIndex, 1);
    }
    writeArticles(articles);
    if (!articleIndex) res.status(404).send('Article not found');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});
