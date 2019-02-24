import quests from '@/Quests';
import Quest from '@/Quest';


const DEFAULT_BOOK_X = 10;
const DEFAULT_BOOK_Y = 530;
let isMenuShowed = false;

function createUI(displayGroup, container) {

    const bookPage = new PIXI.Sprite(PIXI.loader.resources["images/book-page.png"].texture);
    const bookUI = new PIXI.Sprite(PIXI.loader.resources["images/book.png"].texture);
    bookUI.x = DEFAULT_BOOK_X;
    bookUI.y = DEFAULT_BOOK_Y;
    bookUI.interactive = true;
    bookUI.buttonMode = true;
    bookUI.on('pointerdown', () => {
        if (!isMenuShowed) {
            bookPage.parentGroup = displayGroup;
            let todoTextY = 20;
            bookPage.removeChildren();
            quests.quests.map( quest => new PIXI.Text(quest.text,{fontFamily : quest.isDiscovered ? 'Verdana' :'Gullhornet', fontSize: 24, fill : 0xff1010, align : 'center', strokeThickness: 10} ))
                .forEach(todoText => {
                    todoText.x = 210;
                    todoText.y = todoTextY += 35;
                    bookPage.addChild(todoText);
                });

            if (quests.allTranslated()) {
                let finalText = new PIXI.Text("Ueeeeee",{fontFamily : 'Verdana', fontSize: 24, fill : 0xff1010, align : 'center', strokeThickness: 10} );
                finalText.x = 210;
                finalText.y = todoTextY + 50;
                bookPage.addChild(finalText);
                quests.ouijaPieceFound = true;
            }
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
