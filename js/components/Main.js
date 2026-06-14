import { Card } from './Card.js';

export function Main(games) {
  const main = document.createElement('section');
  main.className = 'main';

  const heading = document.createElement('h2');
  heading.className = 'card__heading';
  heading.textContent = 'Collection';

  const list = document.createElement('ul');
  list.className = 'main__list';

  games.forEach((game) => {
    const li = document.createElement('li');
    li.appendChild(Card(game));
    list.appendChild(li);
  });

  main.append(heading, list);
  return main;
}
