

/*
  This is the module that creates the ship. 
*/

var Ship = {
    //global variables
    MAXIMUM_SPEED: 800,
    WEIGHT_PER_ENGINE: 5,
    SPEED_PER_ENGINE: 20,
    CREW_WEIGHT: 2,
    DRONE_WEIGHT: 0.33,
    LOOT_WEIGHT: 0.5,
    GUNS_WEIGHT: 0.8,
    FOOD_WEIGHT: 0.2,
    FUEL_WEIGHT: 0.3,
    CREW_HUNGER: 0.2,
    DAY_PER_DISTANCE: 0.33,
    FUEL_PER_DAY: 1,
    EVENT_PROBABILITY: 0.15,

    // variables
    cargo: [],
    cargoWeight: 0,
    armory: [],
    damage: 0,
    shipWeight: 0,
    
    // init and initiate with standard player or enemy settings
    init: function(distance,crew,food,engines,cargo,money,guns,drones,fuel,loot) {
        this.day = 0;
        this.armor = 200;
        this.damage =  0;
        this.distance = distance;
        this.crew = crew;
        this.food = food;
        this.engines = engines;
        this.cargoCapacity = cargo;
        this.money = money;
        this.guns = guns;
        this.drones = drones;
        this.fuel = fuel;
        this.loot = loot;
		},

    // player initiates
    initiate: function() {
      this.init(0,2,10,6,10,0,1,0,10,0);
    },

    // shhip functions
    weighShip: function() {
        var crew = this.crew * Ship.CREW_WEIGHT;
        var food = this.food * Ship.FOOD_WEIGHT;
        var guns = this.guns * Ship.GUNS_WEIGHT;
        var fuel = this.fuel * Ship.FUEL_WEIGHT;
        var loot = this.loot * Ship.LOOT_WEIGHT;
        var shipWeight = crew + food + guns + fuel + loot;
        var weightCapacity = this.engines * Ship.WEIGHT_PER_ENGINE;
        this.shipWeight = shipWeight;
        if (shipWeight <= weightCapacity) {
            return true;
        } else {
            return false;
        };
    },

    attemptWeight: function(weight) {
        this.weighShip();
        attempt = this.shipWeight + weight;
        capacity = this.engines * Ship.WEIGHT_PER_ENGINE;
        if (attempt <= capacity) {
            return true;
        } else {
            return false;
        };
    },

    addCargo: function(item) {
        var name = item[0];
        var description = item[1];
        var type = item[2];
        var value = item[3];
        var weight = item[4];
        var attempt = this.attemptWeight(weight);
        if (attempt === true) {
            this.cargo.push(item);
            this.shipWeight += weight;
        } else {
            console.log('cannot add item')
            return false;
        }
    },
    
    addWeapon: function(weapon) {
        var name = weapon[0];
        var damage = weapon[1];
        var flavor = weapon[2];
        var value = weapon[3];
        var weight = weapon[4];
        var attempt = this.attemptWeight(weight);
        if (attempt === true) {
            this.armory.push(weapon)
            this.damage += damage;
            this.shipWeight += weight;
            console.log(this.damage);
        } else {
            console.log('cannot add weapon');
            return false;
        };
    },
};
