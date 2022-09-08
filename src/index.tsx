import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainPage } from './MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { urls } from './utils/urls';
import { JSHistory } from './JSHistory/JSHistory';
import { TwoButtons } from './TwoButtons/TwoButtons';
import { injectGlobal } from '@emotion/css';
import { colors } from './utils/theme';
import { ToDoApp } from './ToDoApp/ToDoApp';
import { HackerTyper } from './HackerTyper/HackerTyper';
import { MortgageCalculator } from './MortgageCalculator/MortgageCalculator';
import { MemoryGame } from './MemoryGame/MemoryGame';
import { BlogApp } from './BlogApp/BlogApp';
import { BlogAppNewArticle } from './BlogApp/BlogAppNewArticle';
import { BlogArticle } from './BlogApp/BlogArticle';
import { HttpFilter } from './HttpFilter/HttpFilter';
import { ToDoAppRedux } from './ToDoAppRedux/ToDoAppRedux';

injectGlobal`
  body, * { 
    font-family: 'Finlandica', sans-serif;
    color: ${colors.secondary};
    font-weight: bolder ;
    box-sizing: border-box ;
    margin: 0;
    padding: 0;
 }
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path={urls.mainpage} element={<MainPage />} />
      <Route path={urls.jsHistory} element={<JSHistory />} />

      <Route path={urls.toDoAppRedux} element={<ToDoAppRedux />} />
      <Route path={urls.hackerTyper} element={<HackerTyper />} />
      <Route path={urls.mortgageCalculator} element={<MortgageCalculator />} />
      <Route path={urls.memoryGame} element={<MemoryGame />} />
      <Route path={urls.blogApp} element={<BlogApp />} />
      <Route path={urls.blogAppNewArticle} element={<BlogAppNewArticle />} />
      <Route path={urls.blogAppArticle} element={<BlogArticle />} />
    </Routes>
  </BrowserRouter>
);
