// Создаем элементы
const body = document.body;

// Заголовок
const title = document.createElement('h1');
title.className = 'title';
title.textContent = "Weather Sound";
body.appendChild(title);

// Контейнер для карточек
const container = document.createElement('div');
container.className = 'container';
body.appendChild(container);

// Звуковые карточки
const soundCardsData = [
    { type: 'summer', bg: './assets/summer-bg.jpg', icon: './assets/icons/sun.svg', alt: 'Лето' },
    { type: 'rain', bg: './assets/rainy-bg.jpg', icon: './assets/icons/cloud-rain.svg', alt: 'Дождь' },
    { type: 'winter', bg: './assets/winter-bg.jpg', icon: './assets/icons/cloud-snow.svg', alt: 'Зима' }
];

soundCardsData.forEach(cardData => {
    const card = document.createElement('div');
    card.className = 'sound-card';
    card.dataset.sound = cardData.type;

    const img = document.createElement('img');
    img.src = cardData.bg;
    img.alt = cardData.alt;
    card.appendChild(img);

    const icon = document.createElement('img');
    icon.className = 'icon';
    icon.src = cardData.icon; // Иконки погоды изначально
    icon.dataset.defaultIcon = cardData.icon; // Запоминаем оригинальную иконку
    icon.dataset.pauseIcon = './assets/icons/pause.svg'; // Иконка паузы
    card.appendChild(icon);

    container.appendChild(card);
});

// Аудио элементы
const sounds = {
    summer: new Audio('./assets/sounds/summer.mp3'),
    rain: new Audio('./assets/sounds/rain.mp3'),
    winter: new Audio('./assets/sounds/winter.mp3')
};

const backgrounds = {
    summer: './assets/summer-bg.jpg',
    rain: './assets/rainy-bg.jpg',
    winter: './assets/winter-bg.jpg'
};

// Ползунок громкости
const volumeControl = document.createElement('input');
volumeControl.type = 'range';
volumeControl.className = 'volume-control';
volumeControl.min = 0;
volumeControl.max = 1;
volumeControl.step = 0.01;
volumeControl.value = 1; // 100% громкости по умолчанию
body.appendChild(volumeControl);

// Обработка кликов по карточкам
const soundCards = document.querySelectorAll(".sound-card");

soundCards.forEach(card => {
    card.addEventListener("click", () => {
        const soundType = card.dataset.sound;
        const sound = sounds[soundType];
        const icon = card.querySelector('.icon');

        // Перед включением нового звука сбрасываем все иконки на дефолтные
        soundCards.forEach(otherCard => {
            const otherIcon = otherCard.querySelector('.icon');
            otherIcon.src = otherIcon.dataset.defaultIcon;
        });

        if (sound.paused) {
            // Останавливаем все звуки
            Object.values(sounds).forEach(audio => audio.pause());

            // Меняем фон страницы
            document.body.style.background = `url('${backgrounds[soundType]}') no-repeat center center/cover`;

            // Воспроизводим выбранный звук
            sound.volume = volumeControl.value;
            sound.play();

            // Меняем иконку на паузу
            icon.src = icon.dataset.pauseIcon;
        } else {
            // Останавливаем звук
            sound.pause();

            // Возвращаем оригинальную иконку
            icon.src = icon.dataset.defaultIcon;
        }
    });
});

// Управление громкостью
volumeControl.addEventListener('input', () => {
    Object.values(sounds).forEach(audio => {
        audio.volume = volumeControl.value;
    });
});


