const linksMainpage = {
  home: 'home',
  apps: 'apps',
  technologies: 'technologies',
  cv: 'cv',
};

export const urls = {
  mainpage: '/',
  mainpageHome: `#${linksMainpage.home}`,
  mainpageIDHome: linksMainpage.home,
  mainpageApps: `#${linksMainpage.apps}`,
  mainpageIDApps: linksMainpage.apps,
  mainpageTechnologies: `#${linksMainpage.technologies}`,
  mainpageIDTechnologies: linksMainpage.technologies,
  mainpageCv: `#${linksMainpage.cv}`,
  mainpageIDCv: linksMainpage.cv,
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

const urlGitHub = 'https://github.com/kanardai/smartbrains-ita/tree/main/src/';

export const urlsGitHub = {
  jsHistory: `${urlGitHub}JSHistory`,
  toDoAppRedux: `${urlGitHub}ToDoAppRedux`,
  hackerTyper: `${urlGitHub}HackerTyper`,
  mortgageCalculator: `${urlGitHub}MortgageCalculator`,
  memoryGame: `${urlGitHub}MemoryGame`,
  blogApp: `${urlGitHub}BlogApp`,
};

export const concatUrl = (url: string) => {
  return `/blog-app/articles/${url}`;
};
