import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== 'GET') {
    if (
      !options.headers['Content-Type'] &&
      !(options.body instanceof FormData)
    ) {
      options.headers['Content-Type'] = 'application/json';
    }
  }
  options.headers['csrf_token'] = Cookies.get('csrf_token');

  const res = await window.fetch(url, options);

  return res;
}
