
class Countdown {
    constructor(displayGroup, container) {
        this.timer = new Date().getTime()+ 5 * 60000;
        console.log(this.timer);
        this.clock = new PIXI.Text(this.timer,{fontFamily : 'Verdana', fontSize: 24, fill : 0xff1010, align : 'center', strokeThickness: 10} );
        this.clock.x = 350;

        this.clock.parentGroup = displayGroup;
        container.addChild(this.clock);
    }
    refresh() {
        const timeLeft = this.timer - new Date().getTime();
        this.clock.text = (timeLeft < 280000 ? timeLeft : timeLeft / 1000 | 0);
    }
}

export default Countdown;


