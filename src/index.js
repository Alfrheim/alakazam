import Wizard from '@/sprites/Wizard';
import Countdown from '@/Countdown';
import createUI from '@/sprites/UI';
import createRooms from '@/roomManager';
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
let gameScene;
let gameOverScene;
let gameSpellScene;
let gameWonScene;
let gameMenuScene;

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

function loadProgressHandler(resource) {
    console.log("progress: " + PIXI.loader.progress + "%");
}

function setup() {
    app.stage = new PIXI.display.Stage();

    gameMenuScene = new PIXI.Container();
    let menuNameText = new PIXI.Text("Game Name",{fontFamily : 'Verdana', fontSize: 42, fill : 0xff1010, align : 'center', strokeThickness: 10} );
    let menuStartText = new PIXI.Text("Click/tap to start",{fontFamily : 'Verdana', fontSize: 24, fill : 0xff1010, align : 'center', strokeThickness: 10} );
    menuNameText.x = app.view.width/2;
    menuNameText.y = app.view.height/2;
    menuNameText.anchor.x = 0.5;
    menuNameText.anchor.y = 0.5;
    menuStartText.x = app.view.width/2;
    menuStartText.y = app.view.height/2 + 100;
    menuStartText.anchor.x = 0.5;
    menuStartText.anchor.y = 0.5;
    gameMenuScene.addChild(menuNameText);
    gameMenuScene.addChild(menuStartText);
    gameMenuScene.interactive = true;
    gameMenuScene.on('pointerdown', resetGame);

    gameOverScene = new PIXI.Container();
    let gameOverText = new PIXI.Text("Game Over",{fontFamily : 'Verdana', fontSize: 42, fill : 0xff1010, align : 'center', strokeThickness: 10} );
    let tryAgainText = new PIXI.Text("Click/tap to try again",{fontFamily : 'Verdana', fontSize: 24, fill : 0xff1010, align : 'center', strokeThickness: 10} );
    gameOverText.x = app.view.width/2;
    gameOverText.y = app.view.height/2;
    gameOverText.anchor.x = 0.5;
    gameOverText.anchor.y = 0.5;
    tryAgainText.x = app.view.width/2;
    tryAgainText.y = app.view.height/2 + 100;
    tryAgainText.anchor.x = 0.5;
    tryAgainText.anchor.y = 0.5;
    gameOverScene.addChild(gameOverText);
    gameOverScene.addChild(tryAgainText);
    gameOverScene.interactive = true;
    gameOverScene.visible = false;
    gameOverScene.on('pointerdown', resetGame);

    gameSpellScene = new PIXI.Container();
    let spellBackground = new PIXI.Sprite(PIXI.loader.resources["images/spell.png"].texture);
    gameSpellScene.addChild(spellBackground);
    gameSpellScene.visible = false;
    
    app.stage.addChild(gameMenuScene);
    app.stage.addChild(gameOverScene);
    app.stage.addChild(gameSpellScene);
}

function resetGame() {
    console.log("reset game");
    
    gameMenuScene.visible = false;
    gameOverScene.visible = false;
    gameScene = new PIXI.Container();

    var mainContainer = new PIXI.Container();
    gameScene.addChild(mainContainer);

    var backgroundDisplayGroup = new PIXI.display.Group(-1, false);
    gameScene.addChild(new PIXI.display.Layer(backgroundDisplayGroup));


    var wizardDisplayGroup = new PIXI.display.Group(5, false);
    gameScene.addChild(new PIXI.display.Layer(wizardDisplayGroup));

    var uiDisplayGroup = new PIXI.display.Group(10, false);
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

    //we create the "clock" with delta value, that will refresh the stuff
    app.stage.addChild(gameScene);
    app.ticker.add(delta => gameLoop(delta));

}

function gameLoop(delta) {
    wizard.checkWizardWalk(clickX);
    countDown.refresh();
    if (countDown.isOverTime()) {
        countDown.sound.stop();
        gameScene.visible = false;
        gameOverScene.visible = true;
    }
}

function onClickWalk () {
    console.log("onclickwalk");
    let click = app.renderer.plugins.interaction.mouse.global;
    clickX = click.x;
    wizard.walk(clickX);  
}
