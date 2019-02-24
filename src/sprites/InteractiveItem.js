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
                    console.log("Now to do the spellcastingggg");
                } else {
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