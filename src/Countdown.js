import {Howl, Howler} from 'howler';

const INITIAL_TIME = 1 * 60000;

class Countdown {
    constructor(displayGroup, container) {
        this.timeLeft = INITIAL_TIME;
        this.timer = new Date().getTime()+ this.timeLeft;
        console.log(this.timer);
        this.clock = new PIXI.Text(this.timer,{fontFamily : 'Verdana', fontSize: 24, fill : 0xff1010, align : 'center', strokeThickness: 10} );
        this.clock.x = 350;

        this.clock.parentGroup = displayGroup;
        container.addChild(this.clock);

        this.sound = new Howl({
            src: ['media/rellotge_lent_cut.wav'],
            autoplay: true,
            loop: true,
            volume: 0.0,
            onend: function() {
                console.log('Finished!');
            }
        });
    }
    refresh() {
        this.timeLeft = this.timer - new Date().getTime();
        let textToShow = this.timeLeft / 1000 | 0;
        console.log(this.timeLeft + " and 60% " + 60 * INITIAL_TIME / 100 );
        if(this.isInCalmTime()) {
            this.clock.style['fill'] = 'green';

        } else if(this.isInCautionTime()) {
            this.clock.style['fill'] = 'yellow';

        } else if(this.isInWarningTime()) {
            this.clock.style['fill'] = 'orange';
            textToShow = this.timeLeft;

        } else {
            this.clock.style['fill'] = 'red';
            textToShow = this.timeLeft;
        }

        this.clock.text = textToShow;
    }


    isInCalmTime() {
        return  this.timeLeft > 80 * INITIAL_TIME / 100 ;
    }

    isInCautionTime() {
        return  this.timeLeft > 60 * INITIAL_TIME / 100;
    }

    isInWarningTime() {
        return  this.timeLeft > 40 * INITIAL_TIME / 100;
    }

    isOverTime() {
        return this.timeLeft <= 0;
    }
}

export default Countdown;


