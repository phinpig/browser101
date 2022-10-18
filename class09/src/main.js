'use strict';
import PopUp from './popup.js';
import Game from './game.js';
const gameFinishBanner = new PopUp();

const game = new Game(3, 2, 2);
game.setGameStopListener((reason) => {
    let message;
    switch (reason) {
        case 'cancel':
            message = 'Replay';
            break;
        case 'win':
            message = 'You won';
            break;
        case 'lose':
            message = 'You lose';
            break;
        default:
            throw new Error('not valid reson');
    }
    gameFinishBanner.showWithText(message);
});
gameFinishBanner.setClickListener(() => {
    game.start();
});
