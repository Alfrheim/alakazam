class InventoryItem extends PIXI.Sprite {
    constructor(name, description, resource, room) {
        super(resource);
        this.name = name;
        this.description = description;
        this.belongsToRoom = room;
    }

    addToInventory() {
        room.interactiveItems
    }

    useWith(interactiveItem) {
        
    }
}

export default InventoryItem;