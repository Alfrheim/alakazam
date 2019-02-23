class Room {
    constructor(backgroundResource, mainContainer, displayGroup) {
        this.background = new PIXI.Sprite(PIXI.loader.resources[backgroundResource].texture);
        this.background.interactive = true;
        this.container = mainContainer;
        this.displayGroup = displayGroup;
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

    render() {
        this.background.parentGroup = this.displayGroup;
        this.container.addChild(this.background);

        this.interactiveItems.forEach(element => {
            element.parentGroup = this.displayGroup;
            this.background.addChild(element);
        });
    }

    remove() {
        this.container.removeChild(this.background)
    }
}
export default Room;
    