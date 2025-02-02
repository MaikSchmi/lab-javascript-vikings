// Soldier
class Soldier {
    constructor(health, strength) {
        this.health = health;
        this.strength = strength;
    }
    attack() {
        return this.strength;
    }
    receiveDamage(damage) {
        this.health -= damage;
    }
}

// Viking
class Viking extends Soldier {
    constructor(name, health, strength) {
        super(health, strength);
        this.name = name;
        function myNewFunction() {
            console.log("THis doesn't work")
        }
    }
    receiveDamage(damage) {
        this.health -= damage;
        if (this.health > 0) {
            return `${this.name} has received ${damage} points of damage`
        } else {
            return `${this.name} has died in act of combat`
        }
    }
    battleCry() {
        return `Odin Owns You All!`;
    }
}

class Clock {
    constructor() {
      this.time = 0;
   
      this.tickRegular = function () {
        console.log();
        this.time += 1;
        console.log(this.time);
      };
    }
  }

// Saxon
class Saxon extends Soldier {
    constructor(health, strength) {
        super(health, strength);
    }
    receiveDamage(damage) {
        this.health -= damage;
        if (this.health > 0) {
            return `A Saxon has received ${damage} points of damage`;
        } else {
            return `A Saxon has died in combat`;
        }
    }
}

// War
class War {
    constructor() {
        this.vikingArmy = [];
        this.saxonArmy = [];
    }
    addViking(viking) {
        this.vikingArmy.push(viking);
    }
    addSaxon(saxon) {
        this.saxonArmy.push(saxon);
    }

    vikingAttack() {
        const attackingViking = Math.floor(Math.random() * this.vikingArmy.length);
        const randomSaxon = Math.floor(Math.random() * this.saxonArmy.length);
        const takeDamage = this.saxonArmy[randomSaxon].receiveDamage(this.vikingArmy[attackingViking].attack());
        if (this.saxonArmy[randomSaxon].health <= 0) {
            this.saxonArmy.splice(randomSaxon, 1);
        }
        return takeDamage;
    }
    saxonAttack() {
        const attackingSaxon = Math.floor(Math.random() * this.saxonArmy.length);
        const randomViking = Math.floor(Math.random() * this.vikingArmy.length);
        const takeDamage = this.vikingArmy[randomViking].receiveDamage(this.saxonArmy[attackingSaxon].attack());
        if (this.vikingArmy[randomViking].health <= 0) {
            this.vikingArmy.splice(randomViking, 1);
        }
        return takeDamage;
    }

    // Bonus consolidated vikingAttack / saxonAttack - Random Battle
    fractionAttack() {
        // Determine attacker and defender
        const army = [this.vikingArmy, this.saxonArmy];
        const attackingFraction = Math.floor(Math.random() * 2);
        const defendingFraction = (attackingFraction - 1) * -1;
        const attackingPartyIndex = Math.floor(Math.random() * army[attackingFraction].length)
        const defendingPartyIndex = Math.floor(Math.random() * army[defendingFraction].length)
        const attacker = army[attackingFraction][attackingPartyIndex];
        const defender = army[defendingFraction][defendingPartyIndex];

        // Execute attack
        const takeDamage = defender.receiveDamage(attacker.attack());
        
        // Remove dead soldier
        if (defender.health <= 0) {
            army[defendingFraction].splice(defendingPartyIndex, 1);
        }

        return takeDamage;
    }

    showStatus() {
        let result = "";
        if (this.saxonArmy.length === 0) {
            result = "Vikings have won the war of the century!";
        } else if (this.vikingArmy.length === 0) {
            result = "Saxons have fought for their lives and survived another day...";
        } else {
            result = "Vikings and Saxons are still in the thick of battle.";
        }
        return result;
    }

    // Bonus consolidated vikingAttack / saxonAttack - Called from either
    battleAttack(soldier) { 
        // Determine attacker
        let attacker = 0;
        let attackingArmy;
        let defendingArmy;

        if (typeof soldier === "string") {
            attackingArmy = this.vikingArmy;
            defendingArmy = this.saxonArmy;

            for (let i = 0; i < this.vikingArmy.length; i++) {
                if (this.vikingArmy[i].name === soldier) {
                    attacker = i;
                    break;
                }
            }
        } else {
            attackingArmy = this.saxonArmy;
            defendingArmy = this.vikingArmy;
        }

        const defendingSoldier = Math.floor(Math.random() * defendingArmy.length)
        const takeDamage = defendingArmy[defendingSoldier].receiveDamage(attackingArmy[attacker].attack());
        if (defendingArmy[defendingSoldier].health <= 0) {
            defendingArmy.splice(defendingSoldier, 1);
        }
        return takeDamage;
    }
}

// Test input
const myWar = new War();
myWar.addViking(new Viking("Björn", 650, 50));
myWar.addViking(new Viking("Eisenschild", 675, 75));
myWar.addViking(new Viking("Ragnar", 700, 100));
myWar.addViking(new Viking("Thor", 5000, 5000));
myWar.addSaxon(new Saxon(100, 100));
myWar.addSaxon(new Saxon(100, 100));
myWar.addSaxon(new Saxon(100, 100));
myWar.addSaxon(new Saxon(100, 100));
myWar.addSaxon(new Saxon(100, 100));
myWar.addSaxon(new Saxon(100, 100));
myWar.addSaxon(new Saxon(100, 100));
myWar.addSaxon(new Saxon(100, 100));
myWar.addSaxon(new Saxon(100, 100));
myWar.addSaxon(new Saxon(100, 100));
myWar.addSaxon(new Saxon(100, 100));

myWar.battleAttack("Ragnar");

// Fight war
for (let i = 0; i < 5000; i++) {
    if (myWar.showStatus() === "Vikings and Saxons are still in the thick of battle.") {
        myWar.battleAttack("Ragnar");
        myWar.battleAttack(0);
    } else {
        console.log(myWar.showStatus())
        break;
    }
}



// Fight war
for (let i = 0; i < 5000; i++) {
    if (myWar.showStatus() === "Vikings and Saxons are still in the thick of battle.") {
        myWar.fractionAttack();
    } else {
        console.log(myWar.showStatus())
        break;
    }
}