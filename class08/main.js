const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_TIME = 10;
const field = document.querySelector('.game_field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game_button');
const gameTimer = document.querySelector('.game_timer');
const gameScore = document.querySelector('.game_score');
const popUp = document.querySelector('.popup');
const popUpTxt = document.querySelector('.popup-text');
const popUpReplay = document.querySelector('.popup-replay');

const carrotSound = new Audio('../class07/work/sound/carrot_pull.mp3');
const alertSound = new Audio('../class07/work/sound/alert.wav');
const bgSound = new Audio('../class07/work/sound/bg.mp3');
const bugSound = new Audio('../class07/work/sound/bug_pull.mp3');
const winSound = new Audio('../class07/work/sound/game_win.mp3');
let started = false;
let score = 0;
let timer = undefined;
field.addEventListener('click', onFieldClick);
gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
});
popUpReplay.addEventListener('click', () => {
    startGame();
    hidePopUp();
});
function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}
function stopSound(sound) {
    sound.pause();
}
function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
}
function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    showPopUpWithText('REPLAY?');
    playSound(alertSound);
    stopSound(bgSound);
}
function finishGame(win) {
    started = false;
    stopGameTimer();
    hideGameButton();
    if (win) {
        playSound(winSound);
    } else {
        playSound(bugSound);
    }
    stopSound(bgSound);
    showPopUpWithText(win ? 'You Won' : 'YOU Lost');
}
function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}
function startGameTimer() {
    let remainingTimeSec = GAME_TIME;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}
function stopGameTimer() {
    clearInterval(timer);
}
function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${new String(minutes).padStart(2, 0)}:${new String(seconds).padStart(
        2,
        0
    )}`;
}
function showPopUpWithText(text) {
    popUpTxt.innerText = text;
    popUp.classList.remove('popup-hide');
}
function hidePopUp() {
    popUp.classList.add('popup-hide');
}
function initGame() {
    score = 0;
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, '../class07/work/img/carrot.png');
    addItem('bug', BUG_COUNT, '../class07/work/img/bug.png');
}
function onFieldClick(e) {
    if (!started) {
        return;
    }
    const target = e.target;

    if (target.matches('.carrot')) {
        target.remove();
        carrotSound.play();
        score++;
        updateScoreBoard();
        if (score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if (target.matches('.bug')) {
        bugSound.play();
        finishGame(false);
    }
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}
function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
