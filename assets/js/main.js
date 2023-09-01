addEventListener('hashchange', handleRoute);

const routes = {
  '/': {
    title: 'AnaSayfa',
    templates: 'anasayfa',
  },
  '/signup': {
    title: 'Üye Ol',
    templates: 'signUp',
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

  // login sayfası butona tıklandığında
  const openModalBtn = document.querySelector('#openModalBtn');
  const submitModal = document.querySelector('#submitModal');
  const submitHideBtn = document.querySelector('#submitHideBtn');
  const twetterImg = document.querySelector('#twetter-img');

  openModalBtn.addEventListener('click', () => {
    submitModal.classList.remove('hidden');
    twetterImg.classList.add('hidden');
  });

  submitHideBtn.addEventListener('click', () => {
    submitModal.classList.add('hidden');
    twetterImg.classList.remove('hidden');
  });
}

handleRoute();

// login page hesap açma butonu
