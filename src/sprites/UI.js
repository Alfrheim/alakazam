import quests from '@/Quests';

const DEFAULT_BOOK_X = 10;
const DEFAULT_BOOK_Y = 530;
let isMenuShowed = false;

function createUI(displayGroup, container) {

    const bookPage = new PIXI.Sprite(PIXI.loader.resources["images/book-page.png"].texture);
    const bookUI = new PIXI.Sprite(PIXI.loader.resources["images/book.png"].texture);
    bookUI.x = DEFAULT_BOOK_X;
    bookUI.y = DEFAULT_BOOK_Y;
    bookUI.interactive = true;
    quests.add("Find blue potion");
    quests.add("Get a spoon");
    bookUI.on('pointerdown', () => {
        if (!isMenuShowed) {
            bookPage.parentGroup = displayGroup;
            let todoTextY = 20;
            quests.quests.map( todo => new PIXI.Text(todo,{fontFamily : 'Gullhornet', fontSize: 24, fill : 0xff1010, align : 'center', strokeThickness: 10} ))
                .forEach(todoText => {
                    todoText.x = 120;
                    todoText.y = todoTextY += 35;
                    bookPage.addChild(todoText);
                });

            container.addChild(bookPage);
        } else {
            quests.add("more quests");
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
