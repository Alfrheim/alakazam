import Room from '@/Room';

const DEFAULT_ROOM = 'livingRoom';

function createRooms(displayGroup, container) {
    const rooms = {};
    
    let room = new Room("images/fireplace.png", container, displayGroup);
    room.addInteractiveItem("images/chest.png", 500, 500, "This is a chest");
    room.addInteractiveItem("images/book-fireplace.png", 100, 100, "this is a book");
    room.addWall("livingRoom","livingRoom");
    
    rooms['fireplace'] = room;

    room = new Room("images/livingroom.png", container, displayGroup);
    room.addInteractiveItem("images/mug.png", 300, 200, "This is a mug");
    room.addWall("fireplace","fireplace");
    
    rooms['livingRoom'] = room;

    return rooms;
}

//export createRooms;
export {DEFAULT_ROOM, createRooms};
