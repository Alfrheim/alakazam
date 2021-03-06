import InteractiveItem from '@/sprites/InteractiveItem';

class Room {
    constructor(backgroundResource, mainContainer, displayGroup) {
        this.background = new PIXI.Sprite(PIXI.loader.resources[backgroundResource].texture);
        this.background.interactive = true;
        this.container = mainContainer;
        this.displayGroup = displayGroup;
        this.interactiveItems = [];
        //com que fem servir la funció goToRoom amb un event, el "this" es sobreescriu... peró fent bind ho solucionem
        this.goToRoom = this.goToRoom.bind(this);
    }

    addInteractiveItem(itemResource, posX, posY, itemDescription, quest, itemType = "quest", scenes) {
        let item = new InteractiveItem(itemDescription, PIXI.loader.resources[itemResource].texture, quest, itemType, scenes);
        item.x = posX;
        item.y = posY;
        item.buttonMode = true;
        item.interactive = true;
        item.on('pointerdown', item.interactWith);
        this.interactiveItems.push(item);
    }
    
    addWalls (rightRoom, leftRoom, ceiling){
        this.leftRoom = leftRoom;
        this.rightRoom = rightRoom;
        this.ceiling = ceiling;

        const rightWall = new PIXI.Graphics();
        rightWall.lineStyle(5, 0xFFFFFF, 1);
        rightWall.beginFill(0x0000FF, 1);
        rightWall.drawRect(800-30, 0, 30, 600);
        rightWall.endFill();
        rightWall.alpha = 0; //this should be zero, so is not visible until hoving over
        rightWall.interactive = true;
        rightWall.buttonMode = true;
        rightWall.cursor = 'e-resize';
        rightWall.hitArea = new PIXI.Rectangle(800-30, 0, 30, 600);   //expandir a la mateixa area del rectangle
        this.interactiveItems.push(rightWall);
        rightWall.nextRoom = "right";
        //makes area semi-transparent when mouse over
        rightWall.mouseover = function(mouseData) {
            this.alpha = 0.3;
          }
        // make area transparent when mouse leaves
        rightWall.mouseout = function(mouseData) {
            this.alpha = 0;
        }

        /*const leftWall = new PIXI.Graphics();
        leftWall.lineStyle(5, 0xFFFFFF, 1);
        leftWall.beginFill(0x0000FF, 1);
        leftWall.drawCircle(10, 300, 10);
        leftWall.endFill();
        leftWall.alpha = 0.5; //this should be zero, so is not visible until hoving over
        leftWall.interactive = true;
        leftWall.buttonMode = true;
        leftWall.hitArea = new PIXI.Circle(10, 300, 10);*/
        const leftWall = new PIXI.Graphics();
        leftWall.lineStyle(5, 0xFFFFFF, 1);
        leftWall.beginFill(0x0000FF, 1);
        leftWall.drawRect(0, 0, 30, 600);
        leftWall.endFill();
        leftWall.alpha = 0; //this should be zero, so is not visible until hoving over
        leftWall.interactive = true;
        leftWall.buttonMode = true;
        leftWall.hitArea = new PIXI.Rectangle(0, 0, 30, 600);   //expandir a la mateixa area del rectangle
        leftWall.cursor= 'w-resize';
        this.interactiveItems.push(leftWall);
        leftWall.nextRoom = "left";
        //makes area semi-transparent when mouse over
        leftWall.mouseover = function(mouseData) {
            this.alpha = 0.3;
          }
        // make area transparent when mouse leaves - but it should be transparent
        leftWall.mouseout = function(mouseData) {
            this.alpha = 0;
        }

        if (ceiling){
            const ceilingWall = new PIXI.Graphics();
            ceilingWall.lineStyle(5, 0xFFFFFF, 1);
            ceilingWall.beginFill(0x0000FF, 1);
            ceilingWall.drawCircle(85, 0, 10);
            ceilingWall.endFill();
            ceilingWall.alpha = 0; //this should be zero, so is not visible until hoving over
            ceilingWall.interactive = true;
            ceilingWall.buttonMode = true;
            ceilingWall.cursor = 'n-resize';
            ceilingWall.hitArea = new PIXI.Circle(85,0,10);   //expandir a la mateixa area del rectangle
            this.interactiveItems.push(ceilingWall);
            ceilingWall.nextRoom = "up";
            //makes area semi-transparent when mouse over
            ceilingWall.mouseover = function(mouseData) {
                this.alpha = 0.3;
            }
            // make area transparent when mouse leaves - but it should be transparent
            ceilingWall.mouseout = function(mouseData) {
                this.alpha = 0;
            }
            ceilingWall.on('pointerdown', this.goToRoom);
        }
        

        leftWall.on('pointerdown', this.goToRoom);
        rightWall.on('pointerdown', this.goToRoom);
        
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
        this.container.removeChild(this.background);
    }

    goToRoom(eventData) {
        this.remove();
        if (eventData.target.nextRoom == "left") {
            this.leftRoom.render();
        } else {
            if (eventData.target.nextRoom == "up") 
            { 
                this.ceiling.render();
            }  
            else {
                this.rightRoom.render();
            }
        }
    }
}
export default Room;
    
