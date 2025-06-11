const toggleBtn = document.getElementById('darkModeToggle');
const body = document.body;

// Checar se tema já foi salvo
if (localStorage.getItem('dark-mode') === 'false') {
  body.classList.add('dark');
}

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('dark-mode', body.classList.contains('dark'));
});