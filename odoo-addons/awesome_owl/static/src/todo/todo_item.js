/** @odoo-module **/
import { Component } from "@odoo/owl";
export class TodoItem extends Component {
    static template = "awesome_owl.TodoItem";
    static props = {
        todo: {
            type: Object,
            shape: { id: Number, description: String, isCompleted: Boolean }
        }
    };

    /*
    static props = {
        id: Number,
        description: String,
        isCompleted: Boolean,
    };
    // That would mean the parent uses it like:
    <TodoItem
        id="..."
        description="..."
        isCompleted="..."
    />
    */
}