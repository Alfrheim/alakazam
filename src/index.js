import Wizard from '@/sprites/Wizard';
import createUI from '@/sprites/UI';
import createChest from '@/sprites/Chest';
import Room from '@/Room';
PIXI_LAYERS;

const app = new PIXI.Application({width: 800,
                                  height: 600,
                                  antialias: true,
                                  transparent: false,
                                  resolution: 1});

document.body.appendChild(app.view);

let clickX = 0;     //global variable to store direction of walking +/-
let wizard;        //global variable where we will store class of wizard

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
    app.stage = new PIXI.display.Stage();
    var mainContainer = new PIXI.Container();
    app.stage.addChild(mainContainer);

    const backgound = new PIXI.Sprite(PIXI.loader.resources["images/fireplace.png"].texture);   //the background is resource, so we can call it as such
    backgound.interactive = true;       //we indicate that we will interact with this sprite
    backgound.on('pointerdown', onClickWalk);   //when click, walk. Function is here a bit down

    var backgroundDisplayGroup = new PIXI.display.Group(-1, false);
    app.stage.addChild(new PIXI.display.Layer(backgroundDisplayGroup));

    var uiDisplayGroup = new PIXI.display.Group(1, false);
    app.stage.addChild(new PIXI.display.Layer(uiDisplayGroup));

    //we now show here the background and items. Order matters
    createUI(app, uiDisplayGroup, mainContainer);

    backgound.parentGroup = backgroundDisplayGroup;
    mainContainer.addChild(backgound);

    wizard = new Wizard("images/wizard.json", backgroundDisplayGroup, mainContainer);

    const chest = createChest(backgroundDisplayGroup, mainContainer);


    //app.stage.hitArea = new PIXI.Rectangle(0, 0, app.renderer.width, app.renderer.height);
    //app.stage.interactive = true;
    //app.stage.on('pointerdown', onClickWalk);

    //we create the "clock" with delta value, that will refresh the stuff
    app.ticker.add(delta => gameLoop(delta));

}

function gameLoop(delta) {
    wizard.checkWizardWalk(clickX);
}

function onClickWalk () {
    let click = app.renderer.plugins.interaction.mouse.global;
    clickX = click.x;
    wizard.walk(clickX);  
}
