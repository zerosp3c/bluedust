/* 
    This is the module that creates beings, be they alien, player, or crew.
*/

var Person = {
    // constant variables
    MAXIMUM_WOUNDS: 4,
    MAXIMUM_SPEED: 6,
    MAXIMUM_WEIGHT: 10,
    WEIGHT_PER_STRENGTH: 1,

    // local variables
    wounds: 0,
    speedBonus: 0,
    strength: 1,
    damage: 0,
    weapons: [],
    inventory: [],

    init: function(name, profession) {
        this.name = name;
        this.profession = profession;
    },
};
