import { Header } from './components/Header.js';
import { Loader } from './components/Loader.js';
import { getGames, getGenres, getPlatforms } from './utils/api.js';
import { Main } from './components/Main.js';
import { Pagination } from './components/Pagination.js';
import { Filter } from './components/Filter.js';
import { Error } from './components/Error.js';
import { Footer } from './components/Footer.js';

const app = document.getElementById('app');
const PAGE_SIZE = 20;

let currentSearch = '';
let currentGenre = '';
let currentPlatform = '';

async function loadGames(search = currentSearch, page = 1) {
  currentSearch = search;
  
  const footer = document.querySelector('.footer');
  const oldMain = document.querySelector('.main');
  const oldMainMore = document.querySelector('.pagination');

  let loader;
  if (oldMainMore) {
    oldMainMore.querySelectorAll('button').forEach(btn => btn.disabled =true);
    oldMainMore.querySelector('.pagination__info').textConetnt = 'Loading...';
  } else {
    loader = Loader();
    app.insertBefore(loader, footer);
  }
  
  try {
    const data = await getGames(currentSearch, page, currentGenre, currentPlatform);
    
    if (loader) loader.remove();
    if (oldMain) oldMain.remove();
    if (oldMainMore) oldMainMore.remove();

    app.insertBefore(Main(data.results), footer);

    const totalPages = Math.ceil(data.count / PAGE_SIZE);
    const pagination = Pagination(page, totalPages);
    app.insertBefore(pagination, footer);

    pagination.querySelector('.pagination__prev')
      .addEventListener('click', () => loadGames(currentSearch, page - 1));
    pagination.querySelector('.pagination__next')
      .addEventListener('click', () => loadGames(currentSearch, page + 1));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    if (loader) loader.remove();
    if (oldMain) oldMain.remove();
    if (oldMainMore) oldMainMore.remove();
    app.insertBefore(Error(error.message), footer);
  }
}

async function init() {
  const header = Header();
  app.appendChild(header);
  
  // Listen for search submit
  const form = header.querySelector('.header__search');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = form.search.value.trim();
    loadGames(query, 1);
  });

  // Fetch genres and platformsin parallel
  const [genres, platforms] = await Promise.all([getGenres(), getPlatforms()]);

  const filter = Filter(genres, platforms, (type, value) => {
    if (type === 'genre') currentGenre = value;
    if (type === 'platform') currentPlatform = value;
    loadGames(currentSearch, 1);
  })

  app.appendChild(Footer());
  app.insertBefore(filter, document.querySelector('.footer'));

  loadGames();
}

init();
