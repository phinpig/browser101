'use strict';

export default class PopUp {
    constructor() {
        this.popUp = document.querySelector('.popup');
        this.popUpTxt = document.querySelector('.popup-text');
        this.popUpReplay = document.querySelector('.popup-replay');
        this.popUpReplay.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }
    showWithText(text) {
        this.popUpTxt.innerText = text;
        this.popUp.classList.remove('popup-hide');
    }
    hide() {
        this.popUp.classList.add('popup-hide');
    }
}
