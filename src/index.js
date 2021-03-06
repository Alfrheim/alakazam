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
global.countDown;
let intro=true;

//we load here all images to catch them
PIXI.loader
    //.add("images/wizard.json")
    .add("images/wizardv2.json")
    .add("images/livingroom.png")
    .add("images/office.png")
    .add("images/guix.png")
    .add("images/candles.png")
    .add("images/knife.png")
    .add("images/potion.png")
    .add("images/morter.png")
    .add("images/ouijav2.png")
    .add("images/lighter.png")
    .add("images/kitchenv2.png")
    .add("images/believe.jpg")
    .add("images/spell.png")
    //.add("images/chest.png")
    .add("images/book.png")
    .add("images/book-page.png")
    .add("images/ouijawb.png")
    .add("images/gameover.png")
    .add('fonts/gullhorn.ttf')
    .on("progress", loadProgressHandler)
    .load(setup);

function loadProgressHandler() {
    console.log("progress: " + PIXI.loader.progress + "%");
}

function setup() {
    app.stage = new PIXI.display.Stage();
    const scenes = buildScenes(app);
    const { gameIntroVideoScene, gameMenuScene, gameOverScene, gameEndScene, gameSpellScene, gameOuijaScene } = scenes;
    const resetGameCallback = resetGame(scenes);
    
    gameMenuScene.on('pointerdown', resetGameCallback);
    gameOverScene.on('pointerdown', () => window.location.reload());
    
    if (intro)
    {
        intro=false;
        app.stage.addChild(gameIntroVideoScene);
    }
    else{ 
        
        app.stage.removeChild(gameIntroVideoScene);
    }
    app.stage.addChild(gameMenuScene);
    app.stage.addChild(gameOverScene);
    app.stage.addChild(gameEndScene);
}

function resetGame(scenes) {
    return () => {
        console.log("reset game");
    
        scenes.gameMenuScene.visible = false;
        scenes.gameOverScene.visible = false;
        const gameScene = new PIXI.Container();
    
        const mainContainer = new PIXI.Container();
        gameScene.addChild(mainContainer);
    
        const backgroundDisplayGroup = new PIXI.display.Group(-1, false);
        gameScene.addChild(new PIXI.display.Layer(backgroundDisplayGroup));
    
    
        const wizardDisplayGroup = new PIXI.display.Group(5, false);
        gameScene.addChild(new PIXI.display.Layer(wizardDisplayGroup));
    

        const ouijaDisplayGroup = new PIXI.display.Group(9, false);
        gameScene.addChild(new PIXI.display.Layer(ouijaDisplayGroup));

        scenes.gameSpellScene.parentGroup = ouijaDisplayGroup;
        mainContainer.addChild(scenes.gameSpellScene);

        scenes.gameOuijaScene.parentGroup = ouijaDisplayGroup;
        mainContainer.addChild(scenes.gameOuijaScene);

        const uiDisplayGroup = new PIXI.display.Group(10, false);
        gameScene.addChild(new PIXI.display.Layer(uiDisplayGroup));
        
        scenes.gameScene  = gameScene;

        const room = createRooms(backgroundDisplayGroup, mainContainer, scenes);
        room.background.on('pointerdown', onClickWalk);
        room.rightRoom.background.on('pointerdown', onClickWalk);
        room.leftRoom.background.on('pointerdown', onClickWalk);
        room.ceiling.background.on('pointerdown', onClickWalk);
        room.render();
    
        //we now show here the background and items. Order matters
        createUI(uiDisplayGroup, mainContainer);
    
        wizard = new Wizard("images/wizardv2.json", wizardDisplayGroup, mainContainer);
        global.countDown = new Countdown(uiDisplayGroup, mainContainer);
        
        const gameLoop = () => {
            wizard.checkWizardWalk(clickX);
            global.countDown.refresh();
            if (global.countDown.isOverTime()) {
                global.countDown.sound.stop();
                gameScene.visible = false;
                scenes.gameSpellScene.visible = false;

                scenes.gameOverScene.visible = true;
            } else if(global.countDown.isEndGame) {
                gameScene.visible = false;
                scenes.gameIntroVideoScene.visible = false;
                scenes.gameEndScene.visible = true;
            }
        }
        //we create the "clock" with delta value, that will refresh the stuff
        app.stage.addChild(gameScene);
        app.ticker.add(gameLoop);
    }
}

function onClickWalk () {
    console.log("onclickwalk");
    let click = app.renderer.plugins.interaction.mouse.global;
    clickX = click.x;
    wizard.walk(clickX);  
}
