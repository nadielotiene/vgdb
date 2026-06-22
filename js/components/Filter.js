export function Filter(genres, platforms, onSelect) {
  const section = document.createElement('section');
  section.clasName = 'filters';

  // Genres
  const genreTitle = document.createElement('h3');
  genreTitle.textContent = 'Genres';
  genreTitle.className = 'filters__group';

  const genreList = document.createElement('div');
  genreList.className = 'filters__group';

  genres.forEach(genre => {
    const btn = document.createElement('button');
    btn.className = 'filters__btn';
    btn.textContent = genre.name;
    btn.dataset.type = 'genre';
    btn.dataset.value = genre.slug;
    btn.addEventListener('click', () => {
      toggleActive(btn, genreList);
      onSelect('genre', btn.classList.contains('filters__btn--active') ? genre.slug : '');
    });
    genreList.appendChild(btn);
  });

  // Platforms
  const platformTitle = document.createElement('h3');
  platformTitle.textContent = 'Platforms';
  platformTitle.className = 'filters__title';

  const platformList = document.createElement('div');
  platformList.className = 'filters__group';

  platforms.forEach(platform => {
    const btn = document.createElement('button');
    btn.className = 'filters__btn';
    btn.textContent = platform.name;
    btn.dataset.type = 'platform';
    btn.dataset.value = platform.id;
    btn.addEventListener('click', () => {
      toggleActive(btn, platformList);
      onSelect('platform', btn.classList.contains('filters__btn--active') ? platform.id : '');
    });
    platformList.appendChild(btn);
  });

  section.append(genreTitle, genreList, platformTitle, platformList);
  return section;
}

function toggleActive(btn, group) {
  // Deselect all buttons in the group first
  group.querySelectorAll('.filters__btn').forEach(b => b.classList.remove('filters__btn--active'));
  // Then toggle the clicked one
  btn.classList.toggle('filters__btn--active');
}
