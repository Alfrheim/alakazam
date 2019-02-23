const DEFAULT_X = 100;
const DEFAULT_Y = 400;
const DEFAULT_ANIMATION_SPEED = 0.4;    //how it moves "the feet"
const DEFAULT_WALKING_SPEED = 5;        //how fast it moves in regards of the background

class Wizard {
    
    constructor(resourceName, displayGroup, container) {
        this.speed = 0;

        const sheet = PIXI.loader.resources[resourceName].spritesheet;
        this.wizard = new PIXI.extras.AnimatedSprite(sheet.animations["walk"]);
        this.wizard.animationSpeed = DEFAULT_ANIMATION_SPEED;
        this.wizard.x = DEFAULT_X;
        this.wizard.y = DEFAULT_Y;

        this.wizard.parentGroup = displayGroup;
        container.addChild(this.wizard);
    }

    checkWizardWalk(clickX) {
        if ((this.speed < 0 && clickX >= this.wizard.x) || (this.speed > 0 && clickX <= this.wizard.x))  {
            this.wizard.stop();
            this.speed = 0;
        } else if (this.speed != 0) {
            this.wizard.x += this.speed;
        }
    }
    
    walk(clickX) {
        let compareX = this.wizard.x;
    
        if (this.speed == 0) {
            this.wizard.play();
        }

        if (clickX < compareX) {
            this.speed = -1 * DEFAULT_WALKING_SPEED;
        } else if (clickX > compareX) {
            this.speed = DEFAULT_WALKING_SPEED; 
        } else {
            this.speed = DEFAULT_WALKING_SPEED;
        } 
    }
}
export default Wizard;
