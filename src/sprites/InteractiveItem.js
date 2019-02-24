import quests from '@/Quests';

class InteractiveItem extends PIXI.Sprite {
    constructor(description, resource, quest, itemType) {
        super(resource);
        this.description = description;
        this.quest = quest;
        this.itemType = itemType;
    }

    interactWith(eventData) {
        switch (eventData.target.itemType) {
            case "quest":
                eventData.target.visible = false;
                quests.quests[eventData.target.quest].isDiscovered = true;
                quests.translatedQuests++;
        
                var sound = new Howl({
                    //src: ['media/escriureRapid.wav'],
                    src: ['media/escriureLent.wav'],
                    autoplay: true,
                    loop: false,
                    volume: 3,
                });
                break;
            case "ouija":
                if(quests.ouijaPieceFound) {
                    console.log("gameSpellScene GO!");
                } else {
                    //TODO show this message on screen only for few seconds, or hide it next time we click somewhere?
                    let ouijaText = new PIXI.Text(this.description,{fontFamily : 'Verdana', fontSize: 15, fill : 0xff1010, align : 'center', strokeThickness: 10} );
                    ouijaText.anchor.x = 0.5;
                    ouijaText.x = eventData.target.x - 50;
                    ouijaText.y = eventData.target.y - 50;
                    ouijaText.parentGroup = eventData.target.parentGroup;
                    eventData.target.parent.addChild(ouijaText);
                    console.log(this.description);
                }
                break;
            case "open":
                console.log("open type");
                break;
            default:
                console.log("switch interactiveItem event default");
        }
        
    }
}

export default InteractiveItem;