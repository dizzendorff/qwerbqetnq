document.addEventListener("DOMContentLoaded", () => {
    const tileGrid = document.getElementById("tileGrid");
    const starsContainer = document.querySelector('.stars-container');
    const getSignalButton = document.getElementById("getSignalButton");
    const plusButton = document.querySelector('.plus-button');
    const minusButton = document.querySelector('.minus-button');
    
    const totalTiles = 25; // Всего плиток
    let tilesToOpen = 0; // Количество открываемых плиток
    const tileDelay = 730; // Задержка между открытием плиток (600 миллисекунд)
    const additionalInactiveDuration = 10000; // Дополнительная задержка в 10 секунд
    let openedTiles = new Set(); // Множество для хранения открытых плиток
    let numberOfTraps = 1; // Количество ловушек по умолчанию

    // Создание плиток
    for (let i = 0; i < totalTiles; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.setAttribute('data-index', i);
        tileGrid.appendChild(tile);
    }

    // Создание звезд
    for (let i = 0; i < totalTiles; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.setAttribute('data-index', i);
        starsContainer.appendChild(star);
    }

    // Функция для сброса плиток и звезд
    function resetTiles() {
        Array.from(tileGrid.children).forEach(tile => {
            tile.classList.remove("fade-out");
        });

        Array.from(starsContainer.children).forEach(star => {
            star.style.opacity = 0;
            star.classList.remove("show-star");
        });
    }

    // Функция для блокировки кнопок
    function toggleButtonState(isDisabled) {
        getSignalButton.disabled = isDisabled;
        plusButton.disabled = isDisabled;
        minusButton.disabled = isDisabled;
    }

    // Функция, определяющая количество открываемых плиток
    function determineTilesToOpen(traps) {
        switch (traps) {
            case 1:
                return 8;
            case 3:
                return 6;
            case 5:
                return 4;
            case 7:
                return 3;
            default:
                return 0;
        }
    }

    // Обработка нажатия на кнопку "Получить сигнал"
    getSignalButton.addEventListener("click", () => {
        openedTiles.clear();
        resetTiles();
        toggleButtonState(true); // Блокируем все кнопки

        // Определяем количество открываемых плиток в зависимости от количества ловушек
        tilesToOpen = determineTilesToOpen(numberOfTraps);

        // Открываем случайные плитки
        while (openedTiles.size < tilesToOpen) {
            openedTiles.add(Math.floor(Math.random() * totalTiles));
        }

        const openedTilesThisRound = Array.from(openedTiles);
        console.log("Открытые плитки:", openedTilesThisRound);

        openedTilesThisRound.forEach((tileIndex, i) => {
            setTimeout(() => {
                const tile = tileGrid.children[tileIndex];
                tile.classList.add("fade-out");

                const star = starsContainer.children[tileIndex];
                star.style.opacity = 1;
                star.classList.add("show-star");

                // Проверяем, открыта ли последняя плитка
                if (i === tilesToOpen - 1) {
                    // Блокируем кнопки на 10 секунд
                    setTimeout(() => {
                        toggleButtonState(false); // Разблокируем кнопки
                    }, additionalInactiveDuration);
                }
            }, i * tileDelay); // Используем tileDelay для задержки
        });
    });

    // Обработка нажатия на кнопку plus
    plusButton.addEventListener("click", () => {
        const trapNumber = document.querySelector('.trap-number');
        let currentValue = parseInt(trapNumber.textContent);

        if (currentValue === 1) {
            trapNumber.textContent = 3;
            numberOfTraps = 3;
        } else if (currentValue === 3) {
            trapNumber.textContent = 5;
            numberOfTraps = 5;
        } else if (currentValue === 5) {
            trapNumber.textContent = 7;
            numberOfTraps = 7;
        }
    });

    // Обработка нажатия на кнопку minus
    minusButton.addEventListener("click", () => {
        const trapNumber = document.querySelector('.trap-number');
        let currentValue = parseInt(trapNumber.textContent);

        if (currentValue === 3) {
            trapNumber.textContent = 1;
            numberOfTraps = 1;
        } else if (currentValue === 5) {
            trapNumber.textContent = 3;
            numberOfTraps = 3;
        } else if (currentValue === 7) {
            trapNumber.textContent = 5;
            numberOfTraps = 5;
        }
    });
});