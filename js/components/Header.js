export function Header() {
  const header = document.createElement('header');
  header.className = 'header';

  const logo = document.createElement('span');
  logo.className = 'header__logo';
  logo.textContent = '👾 VGDB';
  header.appendChild(logo);

  return header;
}