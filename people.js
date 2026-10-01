// Страница «Люди»: фильтры по году и кафедре.
// Годы и кафедры берутся из подписей людей в списке — отдельно их вписывать не нужно.
// people.html?year=2024 сразу покажет педсостав смены 2024,
// people.html?dept=Физмат — всех преподавателей кафедры.

const filters = document.querySelector('.filters');
const status = document.querySelector('.people-status');

// Годы, когда смены не было: в диапазонах вроде «2018–2022» они пропускаются
const NO_SHIFT = [2020];

// «2016–2019, 2021» → [2016, 2017, 2018, 2019, 2021]
function parseYears(text) {
    const years = [];
    for (const part of text.split(',')) {
        const [from, to = from] = (part.match(/\d{4}/g) ?? []).map(Number);
        for (let year = from; year <= to; year++) {
            if (!NO_SHIFT.includes(year)) years.push(year);
        }
    }
    return years;
}

const people = [...document.querySelectorAll('.people-list li')].map(li => ({
    li,
    years: parseYears(li.querySelector('.person-years')?.textContent ?? ''),
    depts: (li.querySelector('.person-dept')?.textContent ?? '')
        .split(',').map(dept => dept.trim()).filter(Boolean),
}));

const allYears = [...new Set(people.flatMap(person => person.years))].sort((a, b) => b - a);
const allDepts = [...new Set(people.flatMap(person => person.depts))];

// Выбранные фильтры: пустая строка — «Все»
const params = new URLSearchParams(location.search);
const chosen = { year: params.get('year') ?? '', dept: params.get('dept') ?? '' };

// Ряд кнопок: «Год: Все 2026 2025 …» или «Кафедра: Все Физмат …»
function addRow(label, key, values) {
    const row = document.createElement('div');
    row.className = 'filter-row';
    row.setAttribute('role', 'group');
    row.setAttribute('aria-label', label);

    const title = document.createElement('span');
    title.className = 'filter-label';
    title.textContent = label;
    row.append(title);

    for (const value of ['', ...values.map(String)]) {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip';
        chip.dataset.key = key;
        chip.dataset.value = value;
        chip.textContent = value || 'Все';
        chip.addEventListener('click', () => {
            chosen[key] = value;
            update();
        });
        row.append(chip);
    }
    filters.append(row);
}

function update() {
    let shown = 0;
    for (const person of people) {
        const match = (!chosen.year || person.years.includes(Number(chosen.year)))
            && (!chosen.dept || person.depts.includes(chosen.dept));
        person.li.hidden = !match;
        if (match) shown++;
    }

    for (const chip of filters.querySelectorAll('.chip')) {
        chip.setAttribute('aria-pressed', chip.dataset.value === chosen[chip.dataset.key]);
    }

    const what = [chosen.year && `смена ${chosen.year}`, chosen.dept].filter(Boolean).join(', ');
    status.textContent = shown
        ? `${what ? what[0].toUpperCase() + what.slice(1) + ': ' : ''}показано ${shown} из ${people.length}`
        : 'Никого не нашли — попробуй другой год или кафедру';

    // Адрес страницы повторяет фильтры, чтобы ссылкой можно было поделиться
    const url = new URL(location.href);
    for (const key of ['year', 'dept']) {
        if (chosen[key]) url.searchParams.set(key, chosen[key]);
        else url.searchParams.delete(key);
    }
    history.replaceState(null, '', url);
}

addRow('Год', 'year', allYears);
addRow('Кафедра', 'dept', allDepts);
update();
