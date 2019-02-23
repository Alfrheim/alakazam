import Wizard from '@/sprites/Wizard';
import createUI from '@/sprites/UI';
import createChest from '@/sprites/Chest';
PIXI_LAYERS;

const app = new PIXI.Application({width: 800,
                                  height: 600,
                                  antialias: true,
                                  transparent: false,
                                  resolution: 1});

document.body.appendChild(app.view);

let clickX = 0;     //global variable to store direction of walking +/-
let wizardC;        //global variable where we will store class of wizard

//we load here all images to catch them
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

    const backgound = new PIXI.Sprite(PIXI.loader.resources["images/fireplace.png"].texture);   //the background is resource, so we can call it as such
    backgound.interactive = true;       //we indicate that we will interact with this sprite
    backgound.on('pointerdown', onClickWalk);   //when click, walk

    const book = new PIXI.Sprite(PIXI.loader.resources["images/book.png"].texture);

    wizardC = new Wizard("images/wizard.json");
    const chest = createChest();
    const ui = createUI(app);

    app.stage.addChild(backgound);
    app.stage.addChild(ui);
    app.stage.addChild(chest);
    app.stage.addChild(wizardC.wizard);


    //app.stage.hitArea = new PIXI.Rectangle(0, 0, app.renderer.width, app.renderer.height);
    //app.stage.interactive = true;
    //app.stage.on('pointerdown', onClickWalk);

    app.ticker.add(delta => gameLoop(delta));

}

function gameLoop(delta) {
    wizardC.checkWizardWalk(clickX);
}

function onClickWalk () {
    let click = app.renderer.plugins.interaction.mouse.global;
    clickX = click.x;
    wizardC.walk(clickX);  
}
