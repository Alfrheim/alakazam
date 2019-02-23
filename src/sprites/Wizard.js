const DEFAULT_X = 100;
const DEFAULT_Y = 400;
const DEFAULT_ANIMATION_SPEED = 0.4;

function createWizard(backgroundDisplayGroup, mainContainer) {
    const sheet = PIXI.loader.resources["images/wizard.json"].spritesheet;
    const wizard = new PIXI.extras.AnimatedSprite(sheet.animations["walk"]);
    wizard.animationSpeed = DEFAULT_ANIMATION_SPEED;
    wizard.x = DEFAULT_X;
    wizard.y = DEFAULT_Y;

    wizard.parentGroup = backgroundDisplayGroup;
    mainContainer.addChild(wizard);
    return wizard;
}

export default createWizard;
