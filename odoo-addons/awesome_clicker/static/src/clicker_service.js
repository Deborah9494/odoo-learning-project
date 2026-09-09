/** @odoo-module */
import { registry } from "@web/core/registry";
import { ClickerModel } from "./clicker_model";
// Odoo service
const clickerService = {
    /*
    The service has access to Odoo's services (notification, action) and can coordinate them. Your model ideally shouldn't have to know about those things.
    */
    dependencies: ["effect", "action", "notification"],
    start(env, { effect, action, notification }) {
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

        bus.addEventListener("REWARD", (ev) => {
            const reward = ev.detail;
            const closeNotification = notification.add(
                `Congrats you won a reward: "${reward.description}"`,
                {
                    type: "success",
                    sticky: true,
                    buttons: [
                        {
                            name: "Collect",
                            onClick: () => {
                                reward.apply(clickerModel);
                                closeNotification();
                                action.doAction({
                                    type: "ir.actions.client",
                                    tag: "awesome_clicker.client_action",
                                    target: "new",
                                    name: "Clicker Game"
                                });
                            },
                        },
                    ],
                }
            );
        })

        return clickerModel;
    },
};
registry.category("services").add(
    "awesome_clicker.clicker", 
    clickerService
);