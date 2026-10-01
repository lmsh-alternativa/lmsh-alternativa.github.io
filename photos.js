// Просмотр фото крупно: для всех фото в блоках <div class="photos">.
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
