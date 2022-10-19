const carrotSound = new Audio('../class07/work/sound/carrot_pull.mp3');
const alertSound = new Audio('../class07/work/sound/alert.wav');
const bgSound = new Audio('../class07/work/sound/bg.mp3');
const bugSound = new Audio('../class07/work/sound/bug_pull.mp3');
const winSound = new Audio('../class07/work/sound/game_win.mp3');

export function playCarrot() {
    playSound(carrotSound);
}
export function playBug() {
    playSound(bugSound);
}
export function playAlert() {
    playSound(alertSound);
}
export function playWin() {
    playSound(winSound);
}
export function playBackground() {
    playSound(bgSound);
}
export function stopBackground() {
    stopSound(bgSound);
}
export function aaa() {
    alert('test');
}
function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}
