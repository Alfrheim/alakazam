/*const Application = PIXI.Application,
      loader = PIXI.loader,
      resources = PIXI.loader.resources,
      Sprite = PIXI.Sprite,
      TextureCache = PIXI.utils.TextureCache;*/

const app = new PIXI.Application({width: 1200,
                                  height: 600,
                                  antialias: true,
                                  transparent: false,
                                  resolution: 1});
document.body.appendChild(app.view);

let type = "WebGL";
let soldier;
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas";
}

PIXI.loader
    .add("images/wizard.json")
    .add("images/fireplace.png")
    .on("progress", loadProgressHandler)
    .load(setup);

function loadProgressHandler(resource) {
    console.log("loading: " + resource.url); 

    //Display the percentage of files currently loaded
    console.log("progress: " + PIXI.loader.progress + "%"); 
}
function setup() {
    console.log("setup");

    const wizard = new PIXI.Sprite(PIXI.loader.resources["images/wizard.json"].textures["wizard-walk1"]);
    const backgound = new PIXI.Sprite(PIXI.loader.resources["images/fireplace.png"].texture);
    wizard.x = 0;
    wizard.y = 0;
    app.stage.addChild(backgound);
    app.stage.addChild(wizard);
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {

}
