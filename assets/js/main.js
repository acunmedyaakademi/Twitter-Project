const SUPABASE_URL = 'https://jnkuibkstwdesvxglaci.supabase.co';

const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impua3VpYmtzdHdkZXN2eGdsYWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQyNjUzMjIsImV4cCI6MjAwOTg0MTMyMn0.IRtc7OjR4uBgpmKkvET0cdGjQsZy2tM3KxrWoMkkFWU';

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

addEventListener('hashchange', handleRoute);

const routes = {
  '/': {
    title: 'AnaSayfa',
    templates: 'anasayfa',
    callback: sendForm,
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
  document.querySelector('#loginBtn').addEventListener('click', loginSubmitted);
}

function sendForm() {
  const form = document.querySelector('#sendPost');
  form.addEventListener('submit', sendPost);
}

async function sendPost(e) {
  e.preventDefault();

  const postValue = document.querySelector('#postArea').value;
  // console.log(postValue);
  const { data: fetchedUsers, err } = await supabase.from('users');
  console.log(fetchedUsers);

  const { data: fetchPost, error } = await supabase.from('posts');
  console.log(fetchPost);

  /*      try {
    const { data, error } = await supabase.from('user_profile').insert([
      {
        username: username,
      },
    ]);
  } catch (error) {
    console.warn(error);
  }  */

  try {
    // const id = fetchedUsers.id;
    const { data, error } = await supabase.from('posts').insert([
      {
        content: postValue,
      },
    ]);
  } catch (error) {}
}

//LOGİN aUTH

async function loginSubmitted(event) {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const username = document.querySelector('#username').value;
  try {
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
      username: username,
    });

    if (error) {
      console.error('Log-in error:', error.message);
    } else {
      console.log('User:', user);
      alert(`Logged in as ${user.email}`);
      //fetch homepage to redirect after log in
      const response = await fetch(`/templates/anasayfa.html`);
      const responseHtml = await response.text();
      rootEl.innerHTML = responseHtml;

      sendForm();
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
}

function bindForm() {
  const signUpForm = document.querySelector('#signUpForm');

  signUpForm.addEventListener('submit', e => {
    e.preventDefault();

    document.querySelector('#signUpFormSubmitBtn').addEventListener('click', signUpSubmitted);
  });
}
//SİGNuP Auth
async function signUpSubmitted(event) {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const username = document.querySelector('#sigUp-name').value;
  const confirmPassword = document.querySelector('#confirm-password').value;

  try {
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (password !== confirmPassword) {
      alert('passwords didnt matched');
      return;
    }
    if (error) {
      alert(`Sign-up error:${error.message} `);
    } else {
      const response = await fetch(`/templates/login.html`);
      const responseHtml = await response.text();
      rootEl.innerHTML = responseHtml;
      location.hash = '#/login';

      //post datas to user table

      const { data, error } = await supabase.from('users').insert([
        {
          id: user.id,
          username: username,
          email: email,
          password: password,
          // Add other custom :pasfields as needed
        },
      ]);
      //redesign signup form to get all datas
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
}
