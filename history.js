// Страница «История»: ссылки на годы.
// Они собираются из блоков <article class="shift" id="smena-ГОД">
const yearNav = document.querySelector('.year-nav');

document.querySelectorAll('.shift').forEach(shift => {
    const link = document.createElement('a');
    link.href = '#' + shift.id;
    link.textContent = shift.id.replace('smena-', '');
    yearNav.append(link);
});
