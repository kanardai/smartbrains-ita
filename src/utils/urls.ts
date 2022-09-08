export const urls = {
  mainpage: '/',
  mainpageHome: '#home',
  mainpageIDHome: 'home',
  mainpageApps: '#apps',
  mainpageIDApps: 'apps',
  mainpageTechnologies: '#technologies',
  mainpageIDTechnologies: 'technologies',
  mainpageCv: '#cv',
  mainpageIDCv: 'cv',
  jsHistory: '/js-history',
  twoButtons: '/two-buttons',
  toDoApp: '/todo-app',
  toDoAppRedux: '/todo-app-redux',
  hackerTyper: '/hacker-typer',
  mortgageCalculator: '/mortgage-calculator',
  memoryGame: '/memory-game',
  blogApp: '/blog-app/',
  blogAppNewArticle: '/blog-app/new-article',
  blogAppArticle: 'blog-app/articles/:articleSlug',
  httpFilter: 'http-filter',
};

export const concatUrl = (url: string) => {
  return `/blog-app/articles/${url}`;
};
