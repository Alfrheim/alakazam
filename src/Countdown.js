
class Countdown {
    constructor(displayGroup, container) {
        this.timer = new Date().getTime();
        console.log(this.timer);
        this.clock = new PIXI.Text(this.timer,{fontFamily : 'Verdana', fontSize: 24, fill : 0xff1010, align : 'center', strokeThickness: 10} );

        this.clock.parentGroup = displayGroup;
        container.addChild(this.clock);
    }
    refresh() {
        this.timer = new Date().getTime(); 
        this.clock.text = this.timer;
    }
}

export default Countdown;


