/** @odoo-module */
import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";

export class ClickerModel extends Reactive {
    
    constructor() {
        super();
        this.clicks = 99000; // current number of clicks
        this.level= 0; // will be incremented at some milestones, and open new features
        
        // this.clickBots = 0; // the number of robots that have been purchased
        // this.bigBots = 0;

        this.power = 1;

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
        }

        document.addEventListener("click", () => this.increment(900), true);

        // arrow function: because we want this to continue referring to the ClickerModel instance.
        setInterval(() => {
            // this.clicks += this.clickBots * 10;
            // this.clicks += this.bigBots * 100;
            for (const bot in this.bots) {
                this.clicks += 
                    this.bots[bot].increment * 
                    this.bots[bot].purchased * 
                    this.power;
            }
        }, 10000);
    }
    
    increment(inc) {
        this.clicks += inc;
        // if (this.level < 1 && this.clicks >= 1000) {
        //     // Update the clicker model to instantiate a bus, and to trigger a MILESTONE_1k event when we reach 1000 clicks for the first time.
        //     this.bus.trigger("MILESTONE_1k");
        //     this.level++;
        // }
        // if (this.level < 2 && this.clicks >= 5000){
        //     this.level++;
        // }
        if ( this.milestones[this.level] &&
            this.clicks >= this.milestones[this.level].clicks ) {
                this.bus.trigger(
                    "MILESTONE", 
                    this.milestones[this.level]
                        // for example: 
                        /*
                        {
                            clicks: 1000,
                            unlock: "clickBot"
                        }
                        */
                );
                this.level += 1;
        }
    }

    // buyClickBot() {
    //     const clickBotPrice = 1000;
    //     if (this.clicks < clickBotPrice) {
    //         return false;
    //     }
    //     this.clicks -= clickBotPrice;
    //     this.clickBots += 1;
    // }

    // buyBigBot() {
    //     const bigBotPrice = 5000;
    //     if (this.clicks < bigBotPrice || this.level < 2) {
    //         return false;
    //     }
    //     this.clicks -= bigBotPrice;
    //     this.bigBots += 1;
    // }
    

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

    
    get milestones() {
        return [
            { clicks: 1000, unlock: "clickBot" },
            { clicks: 5000, unlock: "bigBot" },
            { clicks: 100000, unlock: "power" },
        ];
    }   

}