const supabaseUrl = 'https://btsgtdrtzsosuaqhjdos.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2d0ZHJ0enNvc3VhcWhqZG9zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQyMTI0NCwiZXhwIjoyMDA4OTk3MjQ0fQ.O65GiJrRqcDy_EqBLQuUzdNpGT0PsaG0o-U_BXJF0eo';

const supaBase = supabase.createClient(supabaseUrl, supabaseKey);

addEventListener('hashchange', handleRoute);

const routes = {
  '/': {
    title: 'AnaSayfa',
    templates: 'anasayfa',
  },
  '/signUp': {
    title: 'Üye Ol',
    templates: 'signUp',
    callback: bindForm,
  },
  '/login': {
    title: 'Giriş Yap',
    templates: 'login',
    callback: openModal,
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
  let route = routes[url] || routes['/404'];
  console.log(route);

  const response = await fetch(`/templates/${route.templates}.html`);
  const responseHtml = await response.text();

  rootEl.innerHTML = responseHtml;

  document.title = routeTitle + route.title;

  const routeCallback = route.callback || function () {};

  routeCallback.apply();
}

handleRoute();

function openModal() {
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

function bindForm() {
  const signUpForm = document.querySelector('#signUpForm');

  signUpForm.addEventListener('submit', e => {
    e.preventDefault();

    console.log(Object.fromEntries(new FormData(signUpForm)));
  });
}
