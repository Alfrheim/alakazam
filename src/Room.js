class Room {
    constructor(backgroundResource) {
        this.background = new PIXI.Sprite(PIXI.loader.resources[backgroundResource].texture);
        this.background.interactive = true;
        this.interactiveItems = [];
    }

    addInteractiveItem(itemResource, posX, posY, itemDescription) {
        let item = new PIXI.Sprite(PIXI.loader.resources[itemResource].texture);
        item.x = posX;
        item.y = posY;
        item.description = itemDescription;
        item.buttonMode = true;
        item.interactive = true;
        this.interactiveItems.push(item);
    }

    addToContainer(displayGroup, mainContainer) {
        this.background.parentGroup = displayGroup;
        mainContainer.addChild(this.background);

        this.interactiveItems.forEach(element => {
            element.parentGroup = displayGroup;
            mainContainer.addChild(element);
        });
    }
}
export default Room;
    