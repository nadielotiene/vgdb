export function Pagination(currentPage, totalPages) {
  const nav = document.createElement('nav');
  nav.className = 'pagination';

  const prev = document.createElement('button');
  prev.className = 'pagination__prev';
  prev.textContent = '← Prev';
  prev.disabled = currentPage === 1;

  const info = document.createElement('span');
  info.className = 'pagination__info';
  info.textContent = `Page ${currentPage} of ${totalPages}`;

  const next = document.createElement('button');
  next.className = 'pagination__next';
  next.textContent = 'Next →';
  next.disabled = currentPage === totalPages;

  nav.append(prev, info, next);
  return nav;
}