export function Card(game) {
  const card = createElement('article');
  card.className = 'card';

  const heading = document.createElement('h1');
  heading.className = 'card__heading';
  heading.textContent = 'Collection';

  const title = document.createElement('h2');
  title.className = 'card__title';
  title.textContent = game.name;

  const genre = document.createElement('p');
  genre.className = 'card__genre';
  genre.textContent = game.genre;

  const company = document.createElement('p');
  company.className = 'card__company';
  company.textContent = game.company;

  card.append(heading, genre, company);
  return card;
}