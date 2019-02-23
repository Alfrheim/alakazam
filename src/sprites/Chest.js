var DEFAULT_X = 300;
var DEFAULT_Y = 200;

function createChest(backgroundDisplayGroup, mainContainer) {
    const chest = new PIXI.Sprite(PIXI.loader.resources["images/chest.png"].texture);
    chest.x = DEFAULT_X;
    chest.y = DEFAULT_Y;
    chest.interactive = true;
    chest.on('pointerdown', () => {
        alert("Open chest :D");
    });

    chest.parentGroup = backgroundDisplayGroup;
    mainContainer.addChild(chest);
    return chest;
}

export default createChest;
