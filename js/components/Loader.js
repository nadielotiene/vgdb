export function Loader() {
  const loader = document.createElement('p');
  loader.className = 'loader';
  loader.textContent = 'Loading...';
  return loader;
}