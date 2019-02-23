class Room {
    constructor(backgroundResource) {
        this.background = new PIXI.Sprite(PIXI.loader.resources[backgroundResource].texture);
        this.backgound.interactive = true;
        this.backgound.on('pointerdown', onClickWalk);
        this.interactiveItems;
    }

    addInteractiveItem(itemResource, posX, posY, itemDescription) {
        let item = new PIXI.Sprite(PIXI.loader.resources[itemResource].texture);
        item.x = posX;
        item.y = posY;
        item.description = itemDescription;
        this.interactiveItems.push(item);
    }
}
export default Room;
    