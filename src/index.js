import createWizard from '@/sprites/Wizard';
import createUI from '@/sprites/UI';
import createChest from '@/sprites/Chest';
PIXI_LAYERS;

const app = new PIXI.Application({width: 800,
                                  height: 600,
                                  antialias: true,
                                  transparent: false,
                                  resolution: 1});

document.body.appendChild(app.view);

const walkingSpeed = 5;
let speed = 0;
let clickX = 0;
let wizard;

PIXI.loader
    .add("images/wizard.json")
    .add("images/fireplace.png")
    .add("images/chest.png")
    .add("images/book.png")
    .on("progress", loadProgressHandler)
    .load(setup);

function loadProgressHandler(resource) {
    console.log("progress: " + PIXI.loader.progress + "%");
}

function setup() {
    console.log("setup");

    const backgound = new PIXI.Sprite(PIXI.loader.resources["images/fireplace.png"].texture);
    const book = new PIXI.Sprite(PIXI.loader.resources["images/book.png"].texture);

    wizard = createWizard();
    const chest = createChest();
    const ui = createUI(app);

    app.stage.addChild(backgound);
    app.stage.addChild(ui);
    app.stage.addChild(chest);
    app.stage.addChild(wizard);


    app.stage.hitArea = new PIXI.Rectangle(0, 0, app.renderer.width, app.renderer.height);
    app.stage.interactive = true;
    app.stage.on('pointerdown', onClickWalk);

    app.ticker.add(delta => gameLoop(delta));

}

function gameLoop(delta) {
    if ((speed < 0 && clickX >= wizard.x) || (speed > 0 && clickX <= wizard.x))  {
        wizard.stop();
        speed = 0;
    } else if (speed != 0) {
        wizard.x += speed;
    }
}

function onClickWalk () {
    let click = app.renderer.plugins.interaction.mouse.global;
    clickX = click.x;
    let compareX = wizard.x;
    
    if (speed == 0) {
        wizard.play();
    }

    if (clickX < compareX) {
        speed = -1 * walkingSpeed;
    } else if (clickX > compareX) {
        speed = walkingSpeed; 
    } else {
        speed = walkingSpeed;
    } 
        
}
