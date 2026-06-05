export function Error(message) {
  const error = document.createElement('p');
  error.className = 'error';
  error.textContent = 'Something went wrong: ' + message;
  return error;
}