/**
 * 시작시(시작, 성공, 실패) 벌레/당근 배치
 * 타이머  멈춤시 다시 시작 창 나오기
 * 당근/벌레 클릭시 경고음 / 전체 수(당근)에서 숫자 빼기
 * 성공/실패시 나오는 창 그리고 소리
 */
const picture = document.querySelector('.postion-area');
const displayTime = document.querySelector('.time');
const startButton = document.querySelector('.btn-start');
const stopButton = document.querySelector('.btn-stop');
const displayPickUp = document.querySelector('.pickup');
const replay = document.querySelector('.replay');
const popup = document.querySelector('.popup');
const picWidth = picture.offsetWidth;
const picHeight = picture.offsetHeight;
const timer = 10;
const bugs = 10;
const carrots = 8;
let displayMsg = document.querySelector('.msg');
let time = false;
let currentPlay = true;

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopAlert);
picture.addEventListener('click', pickUpCarrot);
replay.addEventListener('click', replayStart);

class SoundSetting {
    constructor() {
        this.bg = new Audio('sound/bg.mp3');
        this.fail = new Audio('sound/alert.wav');
        this.bug = new Audio('sound/bug_pull.mp3');
        this.carrot = new Audio('sound/carrot_pull.mp3');
        this.success = new Audio('sound/game_win.mp3');
    }
}
const sound = new SoundSetting();

// 타이머 설정
function countWatch(ele) {
    viewTime(ele);
    time = setInterval(() => {
        if (!ele) {
            //0이면 실패
            msgAlert(false);
        }
        viewTime(ele--);
    }, 1000);
}
// 시간 보이기

function viewTime(ele) {
    displayTime.innerHTML = '00:' + new String(ele).padStart(2, 0);
}

function startGame() {
    currentPlay = true;
    startButton.style.display = 'none';
    stopButton.style.display = 'block';
    while (picture.hasChildNodes()) {
        picture.removeChild(picture.firstChild);
    }
    countWatch(timer); // 남은 시간(초)
    randomItem(bugs, carrots); // 당근 수, 벌레 수
    sound.bg.play();
}

// 랜덤하게 벌레/당근 위치시키기
function randomItem(carrots = 10, bugs = 5) {
    //당근
    for (let i = 0; i < carrots; i++) {
        insertItem();
    }
    //벌레
    for (let i = 0; i < bugs; i++) {
        insertItem(false);
    }
    displayPickUp.innerText = carrots;
}

function insertItem(carrotYn = true) {
    const pos = {
        //  아이템들이 랜덤하게 위치할 영역값을 가지고 옴
        x: Math.round(Math.random() * picWidth),
        y: Math.round(Math.random() * picHeight),
    };
    const img = document.createElement('img');
    const imgSrc = carrotYn ? 'img/carrot.png' : 'img/bug.png';
    img.setAttribute('src', imgSrc);
    img.setAttribute('data-id', carrotYn);
    img.setAttribute('style', `top:${pos.y}px;left:${pos.x}px`);

    picture.append(img);
}

// 당근/벌레 클릭시 (숫자빼기, 당근 없애기, 벌레 선택시 실패)
function pickUpCarrot(e) {
    const obj = e.target;
    let num = displayPickUp.innerText;
    // currentPlay :true 게임중, false:게임실패 / 승리
    if (obj.tagName === 'IMG' && currentPlay) {
        if (eval(obj.dataset.id)) {
            e.target.remove();
            sound.carrot.play();
            num--;
            displayPickUp.innerText = num;
            if (num === 0) {
                msgAlert(true, 'You Win');
            }
        } else {
            sound.bug.play();
            msgAlert(false, 'Yout Lost');
        }
    }
}

// 성공/실패시 나오는 창, 닫기
function msgAlert(type, msg) {
    currentPlay = false;
    sound.bg.pause();
    stopButton.style.display = 'none';
    clearInterval(time);

    if (type) {
        sound.success.play();
    } else {
        sound.fail.play();
    }
    popup.style.visibility = 'visible';
    displayMsg.innerText = msg;
}
function stopAlert() {
    msgAlert(false, 'Replay ❓');
}
function replayStart() {
    popup.style.visibility = 'hidden';
    displayMsg.innerText = '';
    displayTime.innerText = '00:00';
    displayPickUp.innerText = '0';
    startButton.style.display = 'block';
}
function closeAlert() {
    alert('닫기');
}
