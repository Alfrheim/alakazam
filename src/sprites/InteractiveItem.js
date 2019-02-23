import quests from '@/Quests';

class InteractiveItem extends PIXI.Sprite {
    constructor(description, resource, quest) {
        super(resource);
        this.description = description;
        this.quest = quest;
    }

    interactWith(eventData) {
        eventData.target.visible = false;
        quests.quests[eventData.target.quest].isDiscovered = true;
        quests.translatedQuests++;
    }
}

export default InteractiveItem;