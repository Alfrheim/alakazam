class InteractiveItem extends PIXI.Sprite {
    constructor(name, description, resource, room) {
        super(resource);
        this.name = name;
        this.description = description;
        this.belongsToRoom = room;
    }

    interactWith(interactiveItem) {
        
    }
}

export default InteractiveItem;