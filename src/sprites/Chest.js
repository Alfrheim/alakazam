const DEFAULT_X = 300;
const DEFAULT_Y = 200;

function createChest(displayGroup, container) {
    const chest = new PIXI.Sprite(PIXI.loader.resources["images/chest.png"].texture);
    chest.x = DEFAULT_X;
    chest.y = DEFAULT_Y;
    chest.interactive = true;
    chest.on('pointerdown', () => {
        alert("Open chest :D");
    });

    chest.parentGroup = displayGroup;
    container.addChild(chest);
    return chest;
}

export default createChest;
