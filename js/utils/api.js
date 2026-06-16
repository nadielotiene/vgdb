import { CONFIG } from './config.js'

const API_KEY = CONFIG.RAWG_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export async function getGames(search = '', page = 1) {
  const params = new URLSearchParams({
    key: API_KEY,
    ordering: '-added',
    page,
  });

  if (search) params.set('search', search);

  const response = await fetch(`${BASE_URL}/games?${params}`);
  if (!response.ok) throw new Error('something went wrong: ' + response.status);
  return response.json();
}