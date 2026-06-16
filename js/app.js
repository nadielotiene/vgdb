import { Header } from './components/Header.js';
import { Loader } from './components/Loader.js';
import { getGames } from './utils/api.js';
import { Main } from './components/Main.js';
import { Pagination } from './components/Pagination.js';
import { Error } from './components/Error.js';
import { Footer } from './components/Footer.js';

const app = document.getElementById('app');
const PAGE_SIZE = 20;
let currentSearch = '';

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
    const data = await getGames(currentSearch, page);
    
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

function init() {
  const header = Header();
  app.appendChild(header);
  
  // Listen for search submit
  const form = header.querySelector('.header__search');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = form.search.value.trim();
    loadGames(query, 1);
  });

  app.appendChild(Footer());
  loadGames();
}

init();
