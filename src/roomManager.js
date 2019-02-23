import Room from '@/Room';

function createRooms(displayGroup, container) {

    let room = new Room("images/fireplace.png", container, displayGroup);
    room.addInteractiveItem("images/chest.png", 500, 500, "This is a chest", 0);
    room.addInteractiveItem("images/book-fireplace.png", 100, 100, "this is a book", 2);  

    let room2 = new Room("images/livingroom.png", container, displayGroup);
    room2.addInteractiveItem("images/mug.png", 300, 200, "This is a mug", 3);
    room2.addInteractiveItem("images/chest.png", 100, 100, "this is a book", 4);

    let room3 = new Room("images/kitchen.png", container, displayGroup);
    room3.addInteractiveItem("images/mug.png", 300, 200, "This is a mug", 5);
    room3.addInteractiveItem("images/book-fireplace.png", 100, 100, "this is a book", 1);
    
    room.addWalls(room3,room2);
    room2.addWalls(room,room3);
    room3.addWalls(room2,room);

    return room;
}

export default createRooms;
