import { CONFIG } from './config.js'

const API_KEY = CONFIG.RAWG_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export async function getGames(search = '', page = 1, genre = '', platform = '') {
  const params = new URLSearchParams({
    key: API_KEY,
    ordering: '-added',
    page,
  });

  if (search) params.set('search', search);
  if (genre) params.set('genres', genre);
  if (platform) params.set('platforms', platform);

  const response = await fetch(`${BASE_URL}/games?${params}`);
  if (!response.ok) throw new Error('something went wrong: ' + response.status);
  return response.json();
}

export async function getGenres() {
  const response = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);
  if (!response.ok) throw new Error('Could not fetch genre');
  const data = await response.json();
  return data.results;
}

export async function getPlatforms() {
  const response = await fetch(`${BASE_URL}/platforms/lists/parents?key=${API_KEY}`);
  if (!response.ok) throw new Error('Could not fetch platforms');
  const data = await response.json();
  return data.results;
}
