const SUPABASE_URL = "https://hjsfvuyyshsmgqsqtrtk.supabase.co";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqc2Z2dXl5c2hzbWdxc3F0cnRrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQwMjU2OSwiZXhwIjoyMDA4OTc4NTY5fQ.5AKIE8LoFJEtSKY8WEw-4KXFFDrgYcRvk9NgF1Em3DQ";

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

addEventListener("hashchange", handleRoute);

const routes = {
  "/": {
    title: "AnaSayfa",
    templates: "anasayfa",
  },
  "/signUp": {
    title: "Üye Ol",
    templates: "signUp",
    callback: bindForm,
  },
  "/login": {
    title: "Giriş Yap",
    templates: "login",
    callback: openModal,
  },
  "/404": {
    title: "Sayfa Bulunamadı",
    templates: "404",
  },
};

const routeTitle = "wiwitter | ";
const rootEl = document.querySelector(".root");

async function handleRoute() {
  let url = location.hash.substring(1);

  if (url.length < 1) {
    url = "/login";
  }
  let route = routes[url] || routes["/404"];

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
  const openModalBtn = document.querySelector("#openModalBtn");
  const submitModal = document.querySelector("#submitModal");
  const submitHideBtn = document.querySelector("#submitHideBtn");
  const twetterImg = document.querySelector("#twetter-img");

  openModalBtn.addEventListener("click", () => {
    submitModal.classList.remove("hidden");
    twetterImg.classList.add("hidden");
  });

  submitHideBtn.addEventListener("click", () => {
    submitModal.classList.add("hidden");
    twetterImg.classList.remove("hidden");
  });
  document.querySelector("#loginBtn").addEventListener("click", getAuthUsers);
}

//LOGİN aUTH

async function getAuthUsers(event) {
  event.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const username = document.querySelector("#username").value;
  try {
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
      username: username,
    });

    if (error) {
      console.error("Log-in error:", error.message);
    } else {
      console.log("User:", user);
      alert(`Logged in as ${user.email}`);
      //fetch homepage to redirect after log in
      const response = await fetch(`/templates/anasayfa.html`);
      const responseHtml = await response.text();
      rootEl.innerHTML = responseHtml;
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
}

function bindForm() {
  const signUpForm = document.querySelector("#signUpForm");

  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    document
      .querySelector("#signUpFormSubmitBtn")
      .addEventListener("click", signUpSubmitted);
  });
}
//SİGNuP Auth
async function signUpSubmitted(event) {
  event.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const username = document.querySelector("#sigUp-name").value;
  const confirmPassword = document.querySelector("#confirm-password").value;

  try {
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      username: username,
    });
    if (password !== confirmPassword) {
      alert("passwords didnt matched");
      return;
    }
    if (error) {
      alert(`Sign-up error:${error.message} `);
    } else {
      console.log("User:", user);
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
}
