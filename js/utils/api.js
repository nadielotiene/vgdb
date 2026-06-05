const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function getGames() {
  const response = fetch(BASE_URL + '/games');
  if (!response.ok) throw new Error('something went wrong: ' + response.status);
  return response.json();
}