addEventListener('hashchange', handleRoute);

const routes = {
  '/': {
    title: 'Anasayfa',
    pages: 'anasayfa',
  },
  '/signup': {
    title: 'Üye ol',
    pages: 'signup',
  },
  '/404': {
    title: 'Sayfa Bulunamadı',
    pages: '404',
  },
};

const rootEl = document.querySelector('.root');

async function handleRoute() {
  let url = location.hash.substring(1);

  if (url.length < 1) {
    url = '/';
  }

  const route = routes[url] || routes['/404'];

  document.title = route.title;

  rootEl.innerHTML = await fetch(`/pages/${route.pages}.html`).then(r => r.text());
}

handleRoute();
