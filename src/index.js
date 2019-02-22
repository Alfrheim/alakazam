const Application = PIXI.Application,
      loader = PIXI.loader,
      resources = PIXI.loader.resources,
      Sprite = PIXI.Sprite,
      TextureCache = PIXI.utils.TextureCache;

const app = new PIXI.Application({width: 600,
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

loader
    .add(
        "images/hero.json"
    )
    .on("progress", loadProgressHandler)
    .load(setup);

function loadProgressHandler(resource) {
    console.log("loading: " + resource.url); 

    //Display the percentage of files currently loaded
    console.log("progress: " + loader.progress + "%"); 
}
function setup() {
    console.log("setup");
    app.renderer.render(app.stage);
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {

}
