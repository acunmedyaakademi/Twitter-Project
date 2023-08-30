const createSubBtn = document.querySelector('#createSub');
const subFormWrapper = document.querySelector('#subFormWrapper');

createSubBtn.addEventListener('click', () => {
  subFormWrapper.classList.toggle('hidden');
});
