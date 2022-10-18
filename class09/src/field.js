'use strict';
import * as sound from './sound.js';
const CARROT_SIZE = 80;
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
export default class Field {
    constructor(carrotCount, bugCount) {
        this.carrot_count = carrotCount;
        this.bug_count = bugCount;
        this.field = document.querySelector('.game_field');
        this.fieldRect = this.field.getBoundingClientRect();
        //this.onClick = this.onClick.bind(this); class this 바인딩
        this.field.addEventListener('click', this.onClick);
    }
    init() {
        this.field.innerHTML = '';
        this._addItem('carrot', this.carrot_count, '../class07/work/img/carrot.png');
        this._addItem('bug', this.bug_count, '../class07/work/img/bug.png');
    }
    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }
    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;

        for (let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }
    onClick = (e) => {
        const target = e.target;
        if (target.matches('.carrot')) {
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick('carrot');
        } else if (target.matches('.bug')) {
            this.onItemClick && this.onItemClick('bug');
        }
    };
}
