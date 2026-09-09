/** @odoo-module */
import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";
import { rewards } from "./click_rewards";
import { choose } from "./utils";


export class ClickerModel extends Reactive {
    
    constructor() {
        super();
        this.clicks = 998000; // current number of clicks
        this.level= 3; // will be incremented at some milestones, and open new features
        this.bus = new EventBus();
        
        this.bots = {
            clickbot: {
                price: 1000,
                level: 1,
                increment: 10,
                purchased: 0,
            },
            bigbot: {
                price: 5000,
                level: 2,
                increment: 100,
                purchased: 0,
            }
        };

        this.trees = {
            pearTree: {
                price: 1000000,
                level: 4,
                produce: "pear",
                purchased: 0,
            },
            cherryTree: {
                price: 1000000,
                level: 4,
                produce: "cherry",
                purchased: 0,
            },
        };

        this.fruits = {
            pear: 0,
            cherry: 0,
        };

        this.power = 1;
        document.addEventListener("click", () => this.increment(900), true);
        // arrow function: because we want this to continue referring to the ClickerModel instance.

        setInterval(() => {
            for (const bot in this.bots) {
                this.clicks += 
                    this.bots[bot].increment * 
                    this.bots[bot].purchased * 
                    this.power;
            }
        }, 10000);

        setInterval(() => {
            for (const tree in this.trees) {
                this.fruits[this.trees[tree].produce] += this.trees[tree].purchased;
            }
        }, 30000);
    }
    
    increment(inc) {
        this.clicks += inc;
        if ( this.milestones[this.level] &&
            this.clicks >= this.milestones[this.level].clicks ) {
                this.bus.trigger(
                    "MILESTONE", 
                    this.milestones[this.level]
                        // for example: 
                        /*{
                            clicks: 1000,
                            unlock: "clickBot"
                        }*/
                );
                this.level += 1;
        }
    }

    buyBot(name) {
        if (!Object.keys(this.bots).includes(name)) {
            throw new Error(`Invalid bot name ${name}`);
        }
        if (this.clicks < this.bots[name].price) {
            return false;
        }

        this.clicks -= this.bots[name].price;
        this.bots[name].purchased += 1;
    }

    buyPower(){
        const powerPrice = 50000;
        if (this.clicks < powerPrice){
            return false;
        }
        this.clicks -= powerPrice;
        this.power += 1;
    }

    checkReward(reward) {
        if (reward.minLevel !== undefined && reward.minLevel > this.level) {
            return false;
        }
        if (reward.maxLevel !== undefined && reward.maxLevel < this.level) {
            return false;
        }
        return true;
    }

    giveReward() {
        const availableRewards = rewards.filter(
            (reward) => this.checkReward(reward)
        );

        const reward = choose(availableRewards);
        this.bus.trigger("REWARD", reward);
        return reward;
    }

    buyTree(name) {
        if (!Object.keys(this.trees).includes(name)) {
            throw new Error(`Invalid tree name ${name}`);
        }
        if (this.clicks < this.trees[name].price) {
            return false;
        }
        this.clicks -= this.trees[name].price;
        this.trees[name].purchased += 1;
    }

    get numberTrees(){
        let sum = 0;
        for (const tree in this.trees) {
            sum += this.trees[tree].purchased;
        }
        return sum;
    }
    
    get numberFruits(){
        let sum = 0;
        for (const fruit in this.fruits) {
            sum += this.fruits[fruit];
        }
        return sum;
    }

    get milestones() {
        return [
            { clicks: 1000, unlock: "clickBot" },
            { clicks: 5000, unlock: "bigBot" },
            { clicks: 100000, unlock: "power" },
            { clicks: 1000000, unlock: "trees" },
        ];
    }   

}