/**
 * 시작시(시작, 성공, 실패) 벌레/당근 배치
 * 타이머  멈춤시 다시 시작 창 나오기
 * 당근/벌레 클릭시 경고음 / 전체 수(당근)에서 숫자 빼기
 * 성공/실패시 나오는 창 그리고 소리
 */
const picture = document.querySelector('.postion-area');
const timeArea = document.querySelector('.time');
const startButton = document.querySelector('.btn-start');
const stopButton = document.querySelector('.btn-stop');
const displayPickUp = document.querySelector('.pickup');
const picWidth = picture.offsetWidth;
const picHeight = picture.offsetHeight;
let time = false;

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);
picture.addEventListener('click', pickUpCarrot);
// 타이머 설정
function countWatch(ele) {
  viewTime(ele);
  time = setInterval(() => {
    // console.log(ele);
    if (!ele) {
      endGame();
    }
    viewTime(ele--);
  }, 1000);
}
// 시간 보이기

function viewTime(ele) {
  timeArea.innerHTML = '00:' + new String(ele).padStart(2, 0);
}
function startGame() {
  startButton.style.display = 'none';
  stopButton.style.display = 'block';
  while (picture.hasChildNodes()) {
    picture.removeChild(picture.firstChild);
  }
  countWatch(4); // 남은 시간(초)
  randomItem(10, 7); // 당근 수, 벌레 수
}
function endGame() {
  stopButton.style.display = 'none';
  clearInterval(time);
}

function stopGame() {
  endGame();
  failAlert();
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
  const num = displayPickUp.innerText;

  if (obj.tagName === 'IMG') {
    if (eval(obj.dataset.id)) {
      //
      e.target.remove();
      if (num === 0) {
        winAlert();
      } else {
        displayPickUp.innerText = num - 1;
      }
    } else {
      failAlert();
    }
  }
}
// 배경음악,당근, 벌레 클릭시, 게임완료, 실패시 사운드
function soundBg() {
  console.log('음악배경');
}
function soundCarrot() {
  console.log('음악당근');
}
function soundBug() {
  console.log('음악벌레');
}
function soundSuccess() {
  console.log('음악성공');
}
function soundFail() {
  console.log('음악실패');
}
// 성공/실패시 나오는 창, 닫기
function winAlert() {
  soundSuccess();
  console.log('성공팝업');
}
function failAlert() {
  soundFail();
  console.log('실패팝업');
}
function closeAlert() {
  alert('닫기');
}
