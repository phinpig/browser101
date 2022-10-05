/**
 * 시작시(시작, 성공, 실패) 벌레/당근 배치
 * 타이머  멈춤시 다시 시작 창 나오기
 * 당근/벌레 클릭시 경고음 / 전체 수(당근)에서 숫자 빼기
 * 성공/실패시 나오는 창 그리고 소리
 */
const timeArea = document.querySelector('.time');
const startButton = document.querySelector('.btn-start');
const stopButton = document.querySelector('.btn-stop');
let time = false;
startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);
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
    countWatch(4); // 남은 시간(초)
    randomItem();
}
function endGame() {
    stopButton.style.display = 'none';
    clearInterval(time);
}

function stopGame() {
    endGame();
}
// 당근/벌레 클릭시 (숫자빼기, 당근 없애기, 벌레 선택시 실패)

// 랜덤하게 벌레/당근 배치
function randomItem() {
    console.log('랜덤 배치');
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
    console.log('음악실패');
}
function soundFail() {
    console.log('음악실패');
}
// 성공/실패시 나오는 창, 닫기
function winAlert() {
    console.log('성공');
}
function failAlert() {
    console.log('실패');
}
function closeAlert() {
    console.log('닫기');
}
