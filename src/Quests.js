import Quest from '@/Quest';

class Quests {

    constructor(args) {
        this.translatedQuests = 0;
        this.ouijaPieceFound = false;
        this.quests = [
            new Quest(1, "Time in its realm", false),
            new Quest(2, "all of us humanity", false),
            new Quest(3, "... my Choir", false),
            new Quest(4, "Silence in its arms", false),
            new Quest(5, "he was an Angel", false),
            new Quest(6, "made me disappear", false)
        ];
    }

    byId(id) {
        return this.quests.find(quest => quest.id === id);
    }

    allTranslated() {
        if (this.translatedQuests < this.quests.length) {
            return false;
        }
        return true;
    }

}
export default new Quests();
