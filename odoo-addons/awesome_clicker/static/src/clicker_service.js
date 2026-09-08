/** @odoo-module */
import { registry } from "@web/core/registry";
import { ClickerModel } from "./clicker_model";

// Odoo service
const clickerService = {
    dependencies: ["effect"],
    start(env, { effect }) {
        const clickerModel = new ClickerModel();
        // const bus = clickerModel.bus;
        // bus.addEventListener("MILESTONE_1k", () => {
        //     effect.add({
        //         message: "Milestone reached! You can now buy clickbots",
        //         type: "rainbow_man",
        //     });
        // });
        const bus = clickerModel.bus;
        bus.addEventListener("MILESTONE", (ev) => {
              effect.add({
                message: `Milestone reached! You can now buy ${ev.detail.unlock}`,
                type: "rainbow_man",
            });
        });

        return clickerModel;
    },
};
registry.category("services").add(
    "awesome_clicker.clicker", 
    clickerService
);