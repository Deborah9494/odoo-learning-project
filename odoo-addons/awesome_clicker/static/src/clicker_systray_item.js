/** @odoo-module */
import { Component, useState, useRef, useExternalListener } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

export class ClickerSystray extends Component {
    static template = "awesome_clicker.ClickerSystray";
    static props = {};

    setup() {
        this.state = useState({ counter: 0 });

        // useExternalListener(document.body, "click", () => this.state.counter++, true);
        this.counterButton= useRef("counterButton");
        useExternalListener(
            document.body, 
            "click", 
            this.increment, 
            { capture: true } // listener on document.body gets the click before the button's own t-on-click
        );

        this.action = useService("action");

    }
    increment(event) {
        const button = event.target.closest("button");
        if (button !== this.counterButton.el) {
            this.state.counter++;
        }
    }
    incrementByTen(){
        // this.state.counter += 9;
        this.state.counter += 10;
    }

    openClientAction() {
        this.action.doAction({
            type: "ir.actions.client",
            tag: "awesome_clicker.client_action",
            target: "new",
            name: "Clicker Game"
        });
    }

}

export const systrayItem = {
    Component: ClickerSystray,
};

registry.category("systray").add("awesome_clicker.ClickerSystray", systrayItem, { sequence: 1000 });