// alert('Вітаю! Пачнем?')
// зменныя для працы таймера
const timerInput = document.getElementById('time'); // Радок-input для ўводу часу
const buttonRun = document.getElementById('start-btn'); // Кнопка запуска
const timeData = document.querySelector('#timer'); // захаванне значэння часу

let timer = null;
let timerID = null; //таймер

// Зменныя для працы з карткамі
let count;// колькасць пар па змаўчанні
const countInput = document.getElementById('count'); // Радок-input для ўводу колькасці

// Функцыя, генеравальная массіў парных лікаў. count - колькасць пар.
function createNumbersArray(count) {
    let numbersArray = [];
    for (let i = 1; i <= count; i++) {
        numbersArray.push(i);
        numbersArray.push(i);
    }
    return numbersArray;
}

// Функцыя ператасавання массіва. Функцыя прымае ў аргуменце зыходны массіў 
// і вяртае ператасаванны массіў. arr - массіў лікаў
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // выпадковы індэкс ад 0 да i
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// зменныя для працы з экранам
const startBtn = document.querySelector('#start'); // пачатак гульні
const screens = document.querySelectorAll('.screen');
const goStartBtn = document.querySelector('#go-start'); // паўтор гульні
let resGame = false;

// змена першага экрана
startBtn.addEventListener('click', (event) => {
    event.preventDefault(); //адхіляем пераход по гіперссылке па змаўчанні
    screens[0].classList.add('up');
});

// увод часовага адрэзка гульні і СТАРТ
timerInput.value = '1';
countInput.value = '8';

buttonRun.addEventListener('click', () => {
    timer = Number(timerInput.value) * 60; //усяго ў секундах 
    count = 8; // па змаўчанню 16 штук 4х4 
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

// СТАРТ асноўны запуск
function startGame() {
    clearInterval(timerID); // адлік часу
    // timeData.innerHTML = `00:${time}` //змяняям на :
    setTime(timer);
    timerID = setInterval(decreaseTime, 1000);

    let numbers = createNumbersArray(count); // ствараем массіў
    shuffle(numbers); //ператасоўваем масcіў
    createCard(count, numbers); // ствараем карткі на полі

    //знаходзім ўсе картки
    const cardInAccess = document.querySelectorAll(".card");
    let firstCard = null;
    let secondCard = null;
    let result = 0;
    for (let el of cardInAccess) {
        el.addEventListener('click', () => {
            if (el.classList.contains('open') || el.classList.contains('success')) {
                return
            }

            if (firstCard !== null && secondCard !== null) {
                cardClose(firstCard);
                cardClose(secondCard);
                firstCard = null;
                secondCard = null;
            }
            cardOpen(el);
            if (firstCard === null) {
                firstCard = el;
                (firstCard);
            } else {
                secondCard = el;
                (secondCard);
            }

            if (firstCard !== null && secondCard !== null) {
                let firstCardNumber = firstCard.textContent;
                let secondCardNumber = secondCard.textContent;

                if (firstCardNumber === secondCardNumber) {
                    firstCard.classList.add('success');
                    secondCard.classList.add('success');
                    firstCard = null;
                    secondCard = null;
                    ++result;
                }
            }
            if (result == count) {
                resGame = true;
                setTimeout(() => {
                    finishGame('Віншую з перамогай!', resGame);
                }, 500);
            }
        })
    }
    //rotateCard();
};

// ствараем картки
function createCard(count, arr) {
    for (let i = 0; i < (count * 2); i++) {
        newCard(arr[i]);
    }
}

// дадаем картки на старонку
function newCard(num) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = num;

    document.getElementById('board').append(card);
}

function cardOpen(value) {
    value.classList.add('card--transform');
    setTimeout(() => {
        value.classList.add('open');
        value.classList.remove('card--transform');
    }, 300);
}

function cardClose(value) {
    value.classList.add('card--transform');
    setTimeout(() => {
        value.classList.remove('open');
        value.classList.remove('card--transform');
    }, 300);
}

// канец гульні
function finishGame(str, resGame) {
    clearInterval(timerID);
    timeData.parentNode.classList.add('hide');
    alert(str);
    const scrn = document.getElementById('finish-game');
    if (resGame) {
        scrn.classList.add('screen__gamewin');
    } else {
        scrn.classList.add('screen__gameover');
    }

    screens[2].classList.add('up');
    const lic = document.getElementById('license');
    lic.classList.add('licensing--visibility');
    goStartBtn.addEventListener('click', (event) => {
        event.preventDefault(); //забараняем пераход па гиперссылке па змаўчанню
        for (let i = 0; i < 4; i++) screens[i].classList.remove('up');
        if (resGame) {
            scrn.classList.remove('screen__gamewin');
            resGame = false;
        } else {
            scrn.classList.remove('screen__gameover');
        }
        lic.classList.remove('licensing--visibility');
    });
    deleteCard();
    timerInput.value = '1';
    countInput.value = '8';
    timeData.classList.remove('timer--red');
}

// выдаляем карткі
function deleteCard() {
    const cards = document.querySelectorAll('.card');
    for (const el of cards) {
        el.remove();
    }
}

// лічыльнік часу
function decreaseTime() {
    if (timer === 0) {
        resGame = false;
        finishGame('Нажаль, час скончыўся', resGame)
    } else {
        let currentTime = --timer; // бягучы час
        //timeData.innerHTML = `00:${currentTime}`; // змяняем на функцыю:
        setTime(currentTime);
    }
};

function setTime(value) {
    let seconds = value % 60; // секунды
    let minuts = value / 60 % 60; // хвіліны
    if (value <= 5) timeData.classList.add('timer--red');
    timeData.innerHTML = `${setTextForTime(minuts)}:${setTextForTime(seconds)}`
}

// афармляем вывад таймеру
function setTextForTime(time) {
    time = Math.trunc(time);
    if (time < 10) time = `0${(time)}`
    else time = `${(time)}`;
    return String(time);
}