

const DEFAULT_X = 100;
const DEFAULT_Y = 400;
const DEFAULT_ANIMATION_SPEED = 0.4;

class Wizard {

    createWizard() {
        const sheet = PIXI.loader.resources["images/wizard.json"].spritesheet;
        const wizard = new PIXI.extras.AnimatedSprite(sheet.animations["walk"]);
        wizard.animationSpeed = DEFAULT_ANIMATION_SPEED;
        wizard.x = DEFAULT_X;
        wizard.y = DEFAULT_Y;

        return wizard;
    }
}
export default Wizard;
