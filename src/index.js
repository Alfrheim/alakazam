import Wizard from '@/sprites/Wizard';
import createUI from '@/sprites/UI';
import createRooms from '@/roomManager';
import '@/css/index.css'
import {Howl, Howler} from 'howler';


PIXI_LAYERS;

//const {Howl, Howler} = require('howler');

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
    .add("images/livingroom.png")
    .add("images/kitchen.png")
    .add("images/mug.png")
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
    console.log("setup");
    
    app.stage = new PIXI.display.Stage();
    var mainContainer = new PIXI.Container();
    app.stage.addChild(mainContainer);

    var backgroundDisplayGroup = new PIXI.display.Group(-1, false);
    app.stage.addChild(new PIXI.display.Layer(backgroundDisplayGroup));


    var wizardDisplayGroup = new PIXI.display.Group(5, false);
    app.stage.addChild(new PIXI.display.Layer(wizardDisplayGroup));

    var uiDisplayGroup = new PIXI.display.Group(10, false);
    app.stage.addChild(new PIXI.display.Layer(uiDisplayGroup));

    const room = createRooms(backgroundDisplayGroup, mainContainer);
    room.background.on('pointerdown', onClickWalk);
    room.rightRoom.background.on('pointerdown', onClickWalk);
    room.leftRoom.background.on('pointerdown', onClickWalk);
    room.render();

    //we now show here the background and items. Order matters
    createUI(uiDisplayGroup, mainContainer);

    wizard = new Wizard("images/wizard.json", wizardDisplayGroup, mainContainer);

    //we create the "clock" with delta value, that will refresh the stuff
    app.ticker.add(delta => gameLoop(delta));

    /*var sound = new Howl({
        src: ['media/rellotge2.wav']
      });  
    sound.play();*/

}

function gameLoop(delta) {
    wizard.checkWizardWalk(clickX);
}

function onClickWalk () {
    console.log("onclickwalk");
    let click = app.renderer.plugins.interaction.mouse.global;
    clickX = click.x;
    wizard.walk(clickX);  
}
