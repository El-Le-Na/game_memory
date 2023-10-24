// alert('Вітаю! Пачнем?')
// переменные для работы таймера
const timerInput = document.getElementById("time"); // Строка-input для ввода
const buttonRun = document.getElementById("start-btn"); // Кнопка запуска
const timeData = document.querySelector('#timer'); //содержимое счетчика времени

let timer = null;
let timerID = null; //таймер

// для работы с карточками
let count;// количество пар по умолчанию
const countInput = document.getElementById("count"); // Строка-input для ввода
let card;
let open = false,
    success = false;

// переменные для работы с экраном
const startBtn = document.querySelector('#start'); // начало игры
const screens = document.querySelectorAll('.screen');
const goStartBtn = document.querySelector('#go-start'); // повтор игры

// смена первого экрана
startBtn.addEventListener('click', (event) => {
    event.preventDefault(); //отменяем переход по гиперссылке по умолчанию
    screens[0].classList.add('up');
});

// ввод выбора временного отрезка игры и СТАРТ
timerInput.value = '';
countInput.value = '';

buttonRun.addEventListener('click', () => {
    timer = Number(timerInput.value) * 60; //всего в секундах 
    count = 8; // по умолчанию 16 штук 4х4 
    let numberFromKeyboard = Number(countInput.value);

    if (numberFromKeyboard >= 2 && numberFromKeyboard <= 10) {
        count = numberFromKeyboard;
    } else {
        alert('Вы адзначылі няверную лічбу, будзе запушчана стандартная гульня')
    }

    if (timer > 0 && timer <= 3600) {
        screens[1].classList.add('up');
        startGame();
    } else { alert('Трэба ўвесці час ад 1 да 60 хвілін') }
});

// СТАРТ основной запуск
function startGame() {
    console.log('Start');
    clearInterval(timerID);
    // timeData.innerHTML = `00:${time}` //заменяем на :
    setTime(timer);
    timerID = setInterval(decreaseTime, 1000);
    let numbers = createNumbersArray(count);
    let checkes = createCheckArray(count);
    shuffle(numbers);
    console.log(`peremeh: ${numbers}`);
    createCard(count, numbers); // создаем карточки на поле
    //rotateCard();
};

// счетчик времени
function decreaseTime() {
    if (timer === 0) {
        finishGame()
    } else {
        let currentTime = --timer; //текущее время
        //timeData.innerHTML = `00:${currentTime}`; // заменяем на функцию:
        setTime(currentTime);
    }
};

function setTime(value) {
    let seconds = value % 60; // Получаем секунды
    let minuts = value / 60 % 60; // Получаем минуты
    if (value <= 5) timeData.classList.add('timer--red');
    timeData.innerHTML = `${setTextForTime(minuts)}:${setTextForTime(seconds)}`
}

// оформляем вывод таймера
function setTextForTime(time) {
    time = Math.trunc(time);
    if (time < 10) time = `0${(time)}`
    else time = `${(time)}`;
    return String(time);
}

//создаем карточки
function createCard(count, arr) {
    for (let i = 0; i < (count * 2); i++) {
        newCard(arr[i], ikkk);
    }
}

// добавляем карточки на страницу
function newCard(num, action) {
    card = document.createElement('div');
    card.classList.add('card');
    card.textContent = num;

    card.addEventListener('click', function () {
        if (open == false && success == false) {
            open = true;
            action(card);
            console.log(open, 'card', card);
        }
    })

    document.getElementById('board').append(card);
}

function ikkk(card) {
    cardOpen(card);
}

function cardOpen(value) {
    value.classList.add('card--transform');
    console.log(' и это: ', value);
    setTimeout(() => {
        value.classList.toggle('open');
        value.classList.remove('card--transform');
    }, 300);
}

// конец игры
function finishGame() {
    clearInterval(timerID);
    timeData.parentNode.classList.add('hide');
    alert('Нажаль, час скончыўся');
    screens[2].classList.add('up');
    goStartBtn.addEventListener('click', (event) => {
        event.preventDefault(); //отменяем переход по гиперссылке по умолчанию
        for (let i = 0; i < 4; i++) screens[i].classList.remove('up');
    });
    deleteCard();
    timerInput.value = '';
    countInput.value = '';
    timeData.classList.remove('timer--red');
    // board.innerHTML = `<h1>Вы собрали: <span class="primary">${score}</span></h1>`
}

// удаляем карточки
function deleteCard() {
    const cards = document.querySelectorAll('.card');
    for (const el of cards) {
        el.remove();
    }
}

// Функция, генерирующая массив парных чисел. count - количество пар.
function createNumbersArray(count) {
    let numbersArray = [];
    for (let i = 1; i <= count; i++) {
        numbersArray.push(i);
        numbersArray.push(i);
    }
    console.log(`ischod: ${numbersArray}`);
    return numbersArray;
}
// массив булеан чтобы отметить все ли карточки собрались в пары
function createCheckArray(count) {
    let checkArray = [];
    for (let i = 1; i <= count * 2; i++) {
        checkArray.push(false);
    }
    console.log(`bool: ${checkArray}`);
    return checkArray;
}

// Функция перемешивания массива.Функция принимает в аргументе исходный массив 
// и возвращает перемешанный массив. arr - массив чисел
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
