import { Field, itemType } from './field.js';
import * as sound from './sound.js';
export const Reason = Object.freeze({
    win: 'win',
    loase: 'lose',
    cancel: 'cancel',
});

//Builder Pattern
export class GameBuilder {
    gameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }
    carrotCount(num) {
        this.carrotCount = num;
        return this;
    }
    bugCount(num) {
        this.bugCount = num;
        return this;
    }
    build() {
        return new Game(this.gameDuration, this.carrotCount, this.bugCount);
    }
}

const gameBtn = document.querySelector('.game_button');
const gameScore = document.querySelector('.game_score');
class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.gameBtn = document.querySelector('.game_button');
        this.gameTimer = document.querySelector('.game_timer');
        this.gameScore = document.querySelector('.game_score');
        this.gameBtn.addEventListener('click', () => {
            if (this.started) {
                this.stop(Reason.cancel);
            } else {
                this.start();
            }
        });

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);
        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }
    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }
    start() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
    }

    stop(reason) {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(reason);
    }
    init() {
        this.score = 0;
        gameScore.innerText = his.carrotCount;
        gameField.init();
    }

    onItemClick = (item) => {
        if (!this.started) {
            return;
        }
        if (item === itemType.carrot) {
            this.score++;
            this.updateScoreBoard();
            if (this.score === this.carrotCount) {
                this.stop(Reason.win);
            }
        } else if (item === itemType.bug) {
            this.stop(Reason.loase);
        }
    };

    showStopButton() {
        const icon = gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }

    hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
    }

    showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
            this.updateTimerText(--remainingTimeSec);
            if (remainingTimeSec <= 0) {
                clearInterval(this.timer);
                this.stop(this.score === this.carrotCount ? Reason.win : Reason.loase);
                return;
            }
        }, 1000);
    }
    stopGameTimer() {
        clearInterval(this.timer);
    }
    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerText = `${new String(minutes).padStart(2, 0)}:${new String(
            seconds
        ).padStart(2, 0)}`;
    }

    initGame() {
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();
    }

    updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
    }
}
