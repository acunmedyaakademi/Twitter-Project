addEventListener('hashchange', handleRoute);

const routes = {
  '/': {
    title: 'AnaSayfa',
    templates: 'anaSayfa',
  },
  '/signup': {
    title: 'Üye Ol',
    templates: 'signup',
  },
  '/login': {
    title: 'Giriş Yap',
    templates: 'login',
  },
  '/404': {
    title: 'Sayfa Bulunamadı',
    templates: '404',
  },
};

const routeTitle = 'wiwitter | ';
const rootEl = document.querySelector('.root');

async function handleRoute() {
  let url = location.hash.substring(1);

  if (url.length < 1) {
    url = '/login';
  }

  const route = routes[url] || routes['/404'];

  document.title = routeTitle + route.title;

  rootEl.innerHTML = await fetch(`/templates/${route.templates}.html`).then(r => r.text());
}

handleRoute();
