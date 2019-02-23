import Quest from '@/Quest';

class Quests {

    constructor(args) {
        this.quests = [
            new Quest(1, "Find a blue potion", true),
            new Quest(2, "Not Implemented", false),
            new Quest(3, "Not Implemented", false),
            new Quest(4, "Not Implemented", false),
            new Quest(5, "Not Implemented", false),
            new Quest(6, "Not Implemented", false),
            new Quest(7, "Not Implemented", false),
            new Quest(8, "Not Implemented", false),
            new Quest(9, "Not Implemented", false),
            new Quest(10, "Not Implemented", false)
        ];
    }

    byId(id) {
        return this.quests.find(quest => quest.id === id);
    }

}
export default new Quests();
