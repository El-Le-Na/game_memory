// alert('Вітаю! Пачнем?')
const timerInput = document.getElementById("time"); // Строка-input для ввода
const buttonRun = document.getElementById("start-btn"); // Кнопка запуска
const timeData = document.querySelector('#timer'); //содержимое счетчика времени

let timer = null;
let timerID = null; //таймер

// смена первого экрана
const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
startBtn.addEventListener('click', (event) => {
    event.preventDefault(); //отменяем переход по гиперссылке по умолчанию
    screens[0].classList.add('up');
});

// ввод выбора временного отрезка игры и СТАРТ
timerInput.value = '';
buttonRun.addEventListener('click', () => {
    timer = Number(timerInput.value) * 60; //всего в секундах
    console.log(`1: ${timer}`);
    if (timer > 0 && timer <= 3600) {
        screens[1].classList.add('up');
        console.log(`2: ${timer}`);
        startGame();
    } else { alert('Введите правильное время от 1 до 60 минут') }    
    console.log(`3: ${timer}`);
});

function startGame() {
    console.log('Start');
    clearInterval(timerID);
    // timeData.innerHTML = `00:${time}` //заменяем на :
    setTime(timer);
    timerID = setInterval(decreaseTime, 1000);
    // createRandomCard(); // создаем карточки на поле
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
    timeData.innerHTML = `${setTextForTime(minuts)}:${setTextForTime(seconds)}`
}
// оформляем вывод таймера
function setTextForTime(time) {
    time = Math.trunc(time);
    if (time < 10) time = `0${(time)}`
    else time = `${(time)}`;
    return String(time);
}

function finishGame() {
    timeData.parentNode.classList.add('hide')
    // board.innerHTML = `<h1>Вы собрали: <span class="primary">${score}</span></h1>`
}


// Этап 1.
// Создайте функцию, генерирующую массив парных чисел.
// Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].
// count - количество пар.

function createNumbersArray(count) {

}

// Этап 2. 
// Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив 
// и возвращает перемешанный массив. arr - массив чисел

function shuffle(arr) {

}

// Этап 3. 
// Используйте две созданные функции для создания массива перемешанными номерами. 
// На основе этого массива вы можете создать DOM-элементы карточек. 
// У каждой карточки будет свой номер из массива произвольных чисел. 
// Вы также можете создать для этого специальную функцию. count - количество пар.

//function CreateCard(count) {}
