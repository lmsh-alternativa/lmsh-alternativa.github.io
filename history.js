// Страница «История»: ссылки на годы и просмотр фото крупно

// Ссылки на годы собираются из блоков <article class="shift" id="smena-ГОД">
const yearNav = document.querySelector('.year-nav');

document.querySelectorAll('.shift').forEach(shift => {
    const link = document.createElement('a');
    link.href = '#' + shift.id;
    link.textContent = shift.id.replace('smena-', '');
    yearNav.append(link);
});

// Нажми на фото — откроется крупно; нажми ещё раз или Esc — закроется
const viewer = document.createElement('dialog');
viewer.className = 'photo-viewer';
const bigPhoto = document.createElement('img');
viewer.append(bigPhoto);
document.body.append(viewer);

document.querySelectorAll('.photos img').forEach(photo => {
    const open = () => {
        bigPhoto.src = photo.src;
        bigPhoto.alt = photo.alt;
        viewer.showModal();
    };

    photo.tabIndex = 0;
    photo.addEventListener('click', open);
    photo.addEventListener('keydown', event => {
        if (event.key === 'Enter') open();
    });
});

viewer.addEventListener('click', () => viewer.close());
