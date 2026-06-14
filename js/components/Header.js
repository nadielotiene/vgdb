export function Header() {
  const header = document.createElement('header');
  header.className = 'header';

  const logo = document.createElement('h1');
  logo.className = 'header__logo';
  logo.textContent = '👾 VGDB';

  const form = document.createElement('form');
  form.className = 'header__search';

  const input = document.createElement('input');
  input.type = 'search';
  input.placeholder = 'Search games...';
  input.name = 'search';

  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Search';

  form.append(input, button);
  header.append(logo, form);

  return header;
}