import { Header } from './components/Header.js';
import { Loader } from './components/Loader.js';
import { getGames } from './utils/api.js';
import { Main } from './components/Main.js'
import { Error } from './components/Error.js';
import { Footer } from './components/Footer.js';

const app = document.getElementById('app');

async function loadGames(search = '') {
  // Remove old Main if it exists
  const oldMain = document.querySelector('.main');
  if (oldMain) oldMain.remove();

  const loader = Loader();
  app.appendChild(loader);
  
  try {
    const data = await getGames(search);
    loader.remove();
    const footer = document.querySelector('.footer');
    app.insertBefore(Main(data.results), footer);
  } catch (error) {
    loader.remove();
    app.appendChild(Error(error.message));
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
    loadGames(query);
  });

  loadGames();
  app.appendChild(Footer());
}

init();
