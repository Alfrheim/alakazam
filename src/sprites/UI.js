const DEFAULT_BOOK_X = 10;
const DEFAULT_BOOK_Y = 530;
let isMenuShowed = false;
const todos = ["Find blue potion", "Get a spoon"];

function createUI(displayGroup, container) {
    
    const bookPage = new PIXI.Sprite(PIXI.loader.resources["images/book-page.png"].texture);
    const bookUI = new PIXI.Sprite(PIXI.loader.resources["images/book.png"].texture);
    bookUI.x = DEFAULT_BOOK_X;
    bookUI.y = DEFAULT_BOOK_Y;
    bookUI.interactive = true;
    bookUI.on('pointerdown', () => {
        if (!isMenuShowed) {
            bookPage.parentGroup = displayGroup;
            let todoTextY = 20;
            todos.map( todo => new PIXI.Text(todo,{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'} ))
                .forEach(todoText => {
                    todoText.x = 120;
                    todoText.y = todoTextY += 30;
                    bookPage.addChild(todoText);
                });
    
            container.addChild(bookPage);
        } else {
            container.removeChild(bookPage);
        }
        
        isMenuShowed = !isMenuShowed;

        console.log("show menu");
    });

    bookUI.parentGroup = displayGroup;
    container.addChild(bookUI);
    return bookUI;
}

export default createUI;
