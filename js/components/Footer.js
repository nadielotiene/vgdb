export function Footer() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.textContent = '© ' + new Date().getFullYear() + ' VGDB';

  return footer;
}