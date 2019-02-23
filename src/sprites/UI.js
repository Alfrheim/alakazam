const DEFAULT_BOOK_X = 10;
const DEFAULT_BOOK_Y = 530;
let isMenuShowed = false;

function createUI(displayGroup, container) {
    
    const bookPage = new PIXI.Sprite(PIXI.loader.resources["images/book-page.png"].texture);
    const bookUI = new PIXI.Sprite(PIXI.loader.resources["images/book.png"].texture);
    bookUI.x = DEFAULT_BOOK_X;
    bookUI.y = DEFAULT_BOOK_Y;
    bookUI.interactive = true;
    bookUI.on('pointerdown', () => {
        if (!isMenuShowed) {
            let text = new PIXI.Text('This is a pixi text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
    
            bookPage.parentGroup = displayGroup;
    
            bookPage.addChild(text);
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
