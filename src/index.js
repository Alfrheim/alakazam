import Wizard from '@/sprites/Wizard';
import Countdown from '@/Countdown';
import createUI from '@/sprites/UI';
import createRooms from '@/roomManager';
import buildScenes from '@/scenes';
import '@/css/index.css'


PIXI_LAYERS;

const app = new PIXI.Application({width: 800,
                                  height: 600,
                                  antialias: true,
                                  transparent: false,
                                  resolution: 1});

document.body.appendChild(app.view);

let clickX = 0;     //global variable to store direction of walking +/-
let wizard;        //global variable where we will store class of wizard
let countDown;
let showIntro=true;

//we load here all images to catch them
PIXI.loader
    .add("images/wizard.json")
    .add("images/fireplace.png")
    .add("images/livingroom.png")
    .add("images/kitchen.png")
    .add("images/spell.png")
    .add("images/mug.png")
    .add("images/ouijawb_small.png")
    .add("images/chest.png")
    .add("images/book.png")
    .add("images/book-fireplace.png")
    .add("images/book-page.png")
    .add('fonts/gullhorn.ttf')
    .on("progress", loadProgressHandler)
    .load(setup);

function loadProgressHandler() {
    console.log("progress: " + PIXI.loader.progress + "%");
}

function setup() {
    app.stage = new PIXI.display.Stage();
    const { gameMenuScene, gameOverScene, gameSpellScene } = buildScenes(app);
    const resetGameCallback = resetGame.bind(this, gameMenuScene, gameOverScene)
    
    gameMenuScene.on('pointerdown', resetGameCallback);
    gameOverScene.on('pointerdown', resetGameCallback);
    
    app.stage.addChild(gameMenuScene);
    app.stage.addChild(gameOverScene);
    app.stage.addChild(gameSpellScene);
}

function resetGame(gameMenuScene, gameOverScene) {
    console.log("reset game");
    
    gameMenuScene.visible = false;
    gameOverScene.visible = false;
    const gameScene = new PIXI.Container();

    const mainContainer = new PIXI.Container();
    gameScene.addChild(mainContainer);

    const backgroundDisplayGroup = new PIXI.display.Group(-1, false);
    gameScene.addChild(new PIXI.display.Layer(backgroundDisplayGroup));


    const wizardDisplayGroup = new PIXI.display.Group(5, false);
    gameScene.addChild(new PIXI.display.Layer(wizardDisplayGroup));

    const uiDisplayGroup = new PIXI.display.Group(10, false);
    gameScene.addChild(new PIXI.display.Layer(uiDisplayGroup));

    const room = createRooms(backgroundDisplayGroup, mainContainer);
    room.background.on('pointerdown', onClickWalk);
    room.rightRoom.background.on('pointerdown', onClickWalk);
    room.leftRoom.background.on('pointerdown', onClickWalk);
    room.render();

    //we now show here the background and items. Order matters
    createUI(uiDisplayGroup, mainContainer);

    wizard = new Wizard("images/wizard.json", wizardDisplayGroup, mainContainer);
    countDown = new Countdown(uiDisplayGroup, mainContainer);
    
    const gameCallback = () => {
        wizard.checkWizardWalk(clickX);
        countDown.refresh();
        if (countDown.isOverTime()) {
            countDown.sound.stop();
            gameScene.visible = false;
            gameOverScene.visible = true;
        }
    }
    //we create the "clock" with delta value, that will refresh the stuff
    app.stage.addChild(gameScene);
    app.ticker.add(delta => gameLoop(delta, gameCallback));

}

function gameLoop(delta, gameCallback) {
    gameCallback();
}

function onClickWalk () {
    console.log("onclickwalk");
    let click = app.renderer.plugins.interaction.mouse.global;
    clickX = click.x;
    wizard.walk(clickX);  
}
