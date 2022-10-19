'use strict';
import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';
const gameFinishBanner = new PopUp();
const game = new GameBuilder().gameDuration(5).carrotCount(5).bugCount(4).build();
game.setGameStopListener((reason) => {
    let message;

    switch (reason) {
        case Reason.cancel:
            message = 'Replay';
            sound.playAlert();
            break;
        case Reason.win:
            message = 'You won';
            sound.playWin();
            break;
        case Reason.loase:
            message = 'You lose';
            sound.playBug();
            break;
        default:
            throw new Error('not valid reson');
    }
    gameFinishBanner.showWithText(message);
});
gameFinishBanner.setClickListener(() => {
    game.start();
});
