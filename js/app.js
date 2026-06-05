import { Header } from './components/Header.js';
import { Loader } from './components/Loader.js';
import { getGames } from '../utils/api.js';
import { Error } from './components/Error.js';
import { Footer } from './components/Footer.js';

async function init() {
  const app = document.getElementById('app');
  const loader = Loader();
  
  app.appendChild(Header());
  app.appendChild(loader);
  
  try {
    const games = await getGames();
    loader.remove();
    app.appendChild(games);
  } catch (error) {
    loader.remove();
    app.appendChild(Error(error.message));
  }
  
  app.appendChild(Footer());
}


init();
// const mockData = [
//   { 
//     name: "Final Fantasy VII", 
//     genre: "RPG", 
//     plot: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, officiis dolor quaerat aut commodi, quia eum quidem mollitia beatae ipsam impedit cumque sint exercitationem nulla, expedita ipsum consequuntur maiores nisi?",
//     developer: { 
//       name: "Squaresoft" 
//     } 
//   }
// ];