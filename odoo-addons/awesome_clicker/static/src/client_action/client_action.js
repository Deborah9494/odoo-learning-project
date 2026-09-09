/** @odoo-module */
import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useClicker } from "../clicker_hook";
import { ClickerValue } from "../clicker_value/clicker_value";
import { Notebook } from "@web/core/notebook/notebook";

export class ClickerClientAction extends Component {
    static template = "awesome_clicker.ClickerClientAction";
    static props = ['*']; // Accept whatever props 
    static components = {
        ClickerValue,
        Notebook,
    };
    setup() {
        this.clicker = useClicker();
    }
}
registry.category("actions").add("awesome_clicker.client_action", ClickerClientAction);
