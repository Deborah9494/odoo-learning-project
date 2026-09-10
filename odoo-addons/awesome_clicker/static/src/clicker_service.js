/** @odoo-module */
import { registry } from "@web/core/registry";
import { ClickerModel } from "./clicker_model";
import { browser } from "@web/core/browser/browser";
import { migrate } from "./clicker_migration";

// Odoo service
const clickerService = {
    /*
    The service has access to Odoo's services (notification, action) and can coordinate them. Your model ideally shouldn't have to know about those things.
    */
    dependencies: ["effect", "action", "notification"],
    start(env, { effect, action, notification }) {
        // const clickerModel = new ClickerModel();

        // const localState = JSON.parse(
        //     browser.localStorage.getItem("clickerState")
        // );

        const localState = migrate(
            JSON.parse(browser.localStorage.getItem("clickerState"))
        );

        const clickerModel = localState 
            ? ClickerModel.fromJSON(localState)
            : new ClickerModel();

        setInterval(() => {
            browser.localStorage.setItem(
                "clickerState", 
                JSON.stringify(clickerModel)
                // -> automatically calls toJSON()
            );
        }, 10000);


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