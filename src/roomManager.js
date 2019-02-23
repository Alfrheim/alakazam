import Room from '@/Room';

const DEFAULT_ROOM = 'livingRoom';

function createRooms(displayGroup, container) {
    const rooms = {};
    
    let room = new Room("images/fireplace.png", container, displayGroup);
    room.addInteractiveItem("images/chest.png", 500, 500, "This is a chest");
    room.addInteractiveItem("images/book-fireplace.png", 100, 100, "this is a book");  

    let room2 = new Room("images/livingroom.png", container, displayGroup);
    room2.addInteractiveItem("images/mug.png", 300, 200, "This is a mug");
    
    room.addWall(room2,room2);
    room2.addWall(room,room);

    rooms['fireplace'] = room;
    rooms['livingRoom'] = room2;

    return room;
}

//export createRooms;
export {DEFAULT_ROOM, createRooms};
