import JsHistory from './images/JsHistory.jpg';
import todos from './images/todos.jpg';
import hackertyper from './images/hackertyper.jpg';
import mortgageCalc from './images/mortgageCalc.jpg';
import memory from './images/memory.jpg';
import blog from './images/blog.jpg';
import { urls, urlsGitHub } from '../utils/urls';

export const appCardData = [
  {
    appHeading: 'JsHistory',
    aHref: urlsGitHub.jsHistory,
    urlsLink: urls.jsHistory,
    imgUrl: JsHistory,
  },
  {
    appHeading: 'ToDo Redux',
    aHref: urlsGitHub.toDoAppRedux,
    urlsLink: urls.toDoAppRedux,
    imgUrl: todos,
  },
  {
    appHeading: 'HackerTyper',
    aHref: urlsGitHub.hackerTyper,
    urlsLink: urls.hackerTyper,
    imgUrl: hackertyper,
  },
  {
    appHeading: 'Mortgage Calc',
    aHref: urlsGitHub.mortgageCalculator,
    urlsLink: urls.mortgageCalculator,
    imgUrl: mortgageCalc,
  },
  {
    appHeading: 'Memory Game',
    aHref: urlsGitHub.memoryGame,
    urlsLink: urls.memoryGame,
    imgUrl: memory,
  },
  {
    appHeading: 'Blog App',
    aHref: urlsGitHub.blogApp,
    urlsLink: urls.blogApp,
    imgUrl: blog,
  },
];
