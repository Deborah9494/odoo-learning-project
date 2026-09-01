/** @odoo-module **/

import { Component } from "@odoo/owl";

export class NumberCard extends Component {

    static template = "todo_management.NumberCard";

    static props = {
        domain: String,
        title: String,
        value: Number,
        onClick: Function,
        className: String,
    };

}
