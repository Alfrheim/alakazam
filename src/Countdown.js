import {Howl, Howler} from 'howler';

const INITIAL_TIME = 0.5 * 60000;

class Countdown {

    constructor(displayGroup, container) {
        this.timeLeft = INITIAL_TIME;
        this.timer = new Date().getTime()+ this.timeLeft;
        //console.log(this.timer);
        this.clock = new PIXI.Text(this.timer,{fontFamily : 'Verdana', fontSize: 24, fill : 0xff1010, align : 'center', strokeThickness: 10} );
        this.clock.x = 350;
        this.soundType = null;

        this.clock.parentGroup = displayGroup;
        container.addChild(this.clock);
        this.sound = null;
    }
    refresh() {
        this.timeLeft = this.timer - new Date().getTime();
        let textToShow = this.timeLeft / 1000 | 0;
        if(this.isInCalmTime()) {
            if(this.soundType != "CALM") {
                console.log("calm");
                this.sound = this.calmTimeSound(this);
            }

            this.clock.style['fill'] = 'green';

        } else if(this.isInCautionTime()) {
            if(this.soundType != "CAUTION") {
                console.log("Caution");
                this.sound.mute(true);
            }
            this.clock.style['fill'] = 'yellow';

        } else if(this.isInWarningTime()) {
            if(this.soundType != "WARNING") {
                console.log("Warning");
                this.sound.mute(true);
            }
            this.clock.style['fill'] = 'orange';
            textToShow = this.timeLeft;

        } else {
            if(this.soundType != "DANGER") {
                console.log("Danger");
                this.sound.mute(true);
            }
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

    calmTimeSound() {
        this.soundType = "CALM";
        const result = new Howl({
            src: ['media/rellotge_lent_cut.wav'],
            autoplay: true,
            loop: true,
            volume: 1.0
        });
        result.once('mute', () => {
            console.log("is muted");
            this.sound = this.cautionTimeSound();
        });
        return result;
    }

    cautionTimeSound() {
        this.soundType = "CAUTION";
        const result = new Howl({
            src: ['media/rellotge_lent_cut.wav'],
            autoplay: true,
            loop: true,
            volume: 2.0,
        });
        result.once('mute', () => {
            this.sound = this.warningTimeSound();
        });
        return result;
    }

    warningTimeSound() {
        this.soundType = "WARNING";
        const result = new Howl({
            src: ['media/rellotge4.wav'],
            autoplay: true,
            loop: true,
            volume: 3.0,
        });
        result.once('mute', () => {
            this.sound = this.dangerTimeSound();
        });
        return result;
    }

    dangerTimeSound() {
        this.soundType = "DANGER";
        const result = new Howl({
            src: ['media/rellotge_rapid_cut.wav'],
            autoplay: true,
            loop: true,
            volume: 5.0,
        });
        return result;
    }
}


export default Countdown;


