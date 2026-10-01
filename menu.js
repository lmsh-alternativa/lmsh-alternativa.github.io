// Кнопка «Меню» на телефоне: открывает и закрывает список разделов
const header = document.querySelector('header');
const menuToggle = header.querySelector('.menu-toggle');

menuToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.textContent = isOpen ? 'Закрыть' : 'Меню';
});
