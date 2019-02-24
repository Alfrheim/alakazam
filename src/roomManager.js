import Room from '@/Room';

function createRooms(displayGroup, container, scenes) {

    let room = new Room("images/office.png", container, displayGroup);
    room.addInteractiveItem("images/candles.png", 345, 252, "This is a chest", 1);
    room.addInteractiveItem("images/guix.png", 537, 95, "this is a book", 2);
    room.addInteractiveItem("images/ouijav2.png", 557, 283, "We are still missing something...", -1, "ouija", scenes);  

    let room2 = new Room("images/livingroom.png", container, displayGroup);
    room2.addInteractiveItem("images/lighter.png", 318, 437, "This is a mug", 0);
    
    let room3 = new Room("images/kitchenv2.png", container, displayGroup);
    room3.addInteractiveItem("images/morter.png", 389, 248, "This is a mug", 3);
    room3.addInteractiveItem("images/knife.png", 132, 288, "this is a book", 4);
    room3.addInteractiveItem("images/potion.png", 475, 253, "this is a book", 5);

    let roomUp = new Room("images/believe.jpg", container, displayGroup);
    
    room.addWalls(room3,room2,roomUp);
    room2.addWalls(room,room3);
    room3.addWalls(room2,room);
    roomUp.addWalls(room,room);

    return room;
}

export default createRooms;
