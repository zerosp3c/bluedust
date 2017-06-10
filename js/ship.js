/*
  This is the module that creates the ship. 
*/

var Ship = {
    MAXIMUM_SPEED: 800,
    WEIGHT_PER_ENGINE: 5,
    CREW_WEIGHT: 2,
    DRONE_WEIGHT: 0.33,
    LOOT_WEIGHT: 0.5,
    GUNS_WEIGHT: 0.8,
    FOOD_WEIGHT: 0.2,
    CREW_HUNGER: 0.2,
    DAY_PER_DISTANCE: 0.33,
    EVENT_PROBABILITY: 0.15,

    init: function(stats) {
		this.day = stats;
        this.distance = stats.distance;
        this.crew = stats.crew;
        this.food = stats.food;
        this.engines = stats.engines;
        this.cargo = stats.cargo;
        this.money = stats.money;
        this.guns = stats.guns;
        this.fuel = stats.fuel;
        this.loot = stats.loot;
		}
};


/*
  Test
*/

userShip = Ship.init(0,0,1,80,2,200,2,80,0);
console.log(userShip)