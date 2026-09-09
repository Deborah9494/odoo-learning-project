/** @odoo-module */
import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { useClicker } from "../clicker_hook";
import { ClickerValue } from "../clicker_value/clicker_value";
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";

export class ClickerSystray extends Component {
    static template = "awesome_clicker.ClickerSystray";
    static props = {};
    static components = {
        ClickerValue,
        Dropdown,
        DropdownItem,
    };
    setup() {
        this.action = useService("action");
        // get the service and make the reactive service state available to the component
        this.clicker = useClicker();
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
registry.category("systray").add(
    "awesome_clicker.ClickerSystray", 
    systrayItem, 
    { sequence: 1000 }
);