/** @odoo-module **/
import { Component } from "@odoo/owl";
export class TodoDashboardItem extends Component {
    static template = "todo_management.TodoDashboardItem";
    static props = {
        size: { 
            type: Number,
            default: 1, 
            optional: true 
        },
        slots: {
            type: Object,
            shape: {
                default: Object
            },
        }
    };
}