class Room {
    constructor(backgroundResource, mainContainer, displayGroup) {
        this.background = new PIXI.Sprite(PIXI.loader.resources[backgroundResource].texture);
        this.background.interactive = true;
        this.container = mainContainer;
        this.displayGroup = displayGroup;
        this.interactiveItems = [];
    }

    addInteractiveItem(itemResource, posX, posY, itemDescription) {
        let item = new PIXI.Sprite(PIXI.loader.resources[itemResource].texture);
        item.x = posX;
        item.y = posY;
        item.description = itemDescription;
        item.buttonMode = true;
        item.interactive = true;
        this.interactiveItems.push(item);
    }
    
    addWall (rightRoom, leftRoom){
        var rightWall = new PIXI.Graphics();
        rightWall.lineStyle(5, 0xFFFFFF, 1);
        rightWall.beginFill(0x0000FF, 1);
        rightWall.drawRect(800-30, 0, 30, 600);
        rightWall.endFill();
        rightWall.alpha = 0; //this should be zero, so is not visible until hoving over
        rightWall.interactive = true;
        rightWall.buttonMode = true;
        rightWall.hitArea = new PIXI.Rectangle(800-30, 0, 30, 600);   //expandir a la mateixa area del rectangle
        this.interactiveItems.push(rightWall);
        //makes circle non-transparent when mouse over
        rightWall.mouseover = function(mouseData) {
            this.alpha = 0.5;
          }
        // make circle half-transparent when mouse leaves - but it should be transparent
        rightWall.mouseout = function(mouseData) {
            this.alpha = 0;
        }

        var leftWall = new PIXI.Graphics();
        leftWall.lineStyle(5, 0xFFFFFF, 1);
        leftWall.beginFill(0x0000FF, 1);
        leftWall.drawCircle(10, 300, 10);
        leftWall.endFill();
        leftWall.alpha = 0.5; //this should be zero, so is not visible until hoving over
        leftWall.interactive = true;
        leftWall.buttonMode = true;
        leftWall.hitArea = new PIXI.Circle(10, 300, 10);
        this.interactiveItems.push(leftWall);
        //makes circle non-transparent when mouse over
        leftWall.mouseover = function(mouseData) {
            this.alpha = 1;
          }
        // make circle half-transparent when mouse leaves - but it should be transparent
        leftWall.mouseout = function(mouseData) {
            this.alpha = 0.5;
        }
        //TODO
        /*if (clicked)   { remove room and go to left or rightRoom}*/
    }

    render() {
        this.background.parentGroup = this.displayGroup;
        this.container.addChild(this.background);

        this.interactiveItems.forEach(element => {
            element.parentGroup = this.displayGroup;
            this.background.addChild(element);
        });
    }

    remove() {
        this.container.removeChild(this.background)
    }
}
export default Room;
    