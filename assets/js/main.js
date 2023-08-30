const subFormWrapper = document.querySelector('#subFormWrapper');
const createSub = document.querySelector('#createSub');

createSub.addEventListener('click', () => {
  subFormWrapper.classList.toggle('hidden');
});
