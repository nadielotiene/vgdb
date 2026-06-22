export function Card(game) {
  const card = document.createElement('article');
  card.className = 'card';

  const title = document.createElement('h2');
  title.className = 'card__title';
  title.textContent = game.name;

  const image = document.createElement('img');
  image.className = 'card__image';
  image.src = game.background_image ?? '';
  image.alt = game.name;

  const released = document.createElement('p');
  released.className = 'card__released';
  released.textContent = 'Release Date: ' + game.released;

  const rating = document.createElement('p');
  rating.className = 'card__rating';
  rating.textContent = 'Rating: ' + game.rating;

  const platforms = document.createElement('ul');
  platforms.className = 'card__platforms';
  platforms.textContent = game.platforms.length === 1 ? 'Platform: ' : 'Platforms: ';
  game.platforms.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p.platform.name;
    platforms.appendChild(li);
  });

  const genreList = document.createElement('ul');
  genreList.className = 'card__genres';
  genreList.textContent = 
    game.genres.length === 1 ? 'Genre: ' : 'Genres: ';
  game.genres.forEach((genre) => {
    const li = document.createElement('li');
    li.textContent = genre.name;
    genreList.appendChild(li);
  });

  card.append(
    title, image, released, rating, genreList
  );
  return card;
}