const DEFAULT_BOOK_X = 10;
const DEFAULT_BOOK_Y = 530;

function createUI(app) {

    const bookUI = new PIXI.Sprite(PIXI.loader.resources["images/book.png"].texture);
    bookUI.x = DEFAULT_BOOK_X;
    bookUI.y = DEFAULT_BOOK_Y;
    bookUI.interactive = true;
    bookUI.on('pointerdown', () => {
        let text = new PIXI.Text('This is a pixi text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
        const layer = new PIXI.display.Layer();
        text.parentLayer = layer;

        app.stage.addChild(layer);
        console.log("show menu");
    });
    return bookUI;
}

export default createUI;
