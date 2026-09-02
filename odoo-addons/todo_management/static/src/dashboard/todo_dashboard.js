/** @odoo-module */

import { Component, onWillStart } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { TodoDashboardItem } from "./todo_dashboard_item/todo_dashboard_item";

export class TodoDashboard extends Component {
    static template = "todo_management.TodoDashboard";

    static components = {
        Layout,
        TodoDashboardItem
    };

    setup() {

        this.display = {
            controlPanel: {},
        };
        this.action = useService("action");
        this.orm = useService("orm");
        this.data = {
            total: 0,
            pending: 0,
            completed: 0,
            overdue: 0,
            due_today: 0,
        };
        this.items = registry.category("todo_dashboard").getAll();
        onWillStart(async () => {
            this.data = await this.orm.call(
                "todo.item",
                "get_dashboard_data",
                []
            );
            this.items = this.items.map((item) => ({
                ...item,
                props: item.props(
                    this.data,
                    this.openTasks.bind(this)
                ),
            }));
        });
    }

    openUsers() {
        this.action.doAction("base.action_res_users");
    }
    
    openTasks(type) {
        if (type === "pending") {
            this.action.doAction("todo_management.todo_item_action_pending");
        } else if (type === "completed") {
            this.action.doAction("todo_management.todo_item_action_completed");
        } else if (type === "overdue") {
            this.action.doAction("todo_management.todo_item_action_overdue");
        } else if (type === "duetoday"){
            this.action.doAction("todo_management.todo_item_action_duetoday");
        } else if (type === "pending_low"){
            this.action.doAction("todo_management.todo_item_action_pending_low");
        } else if (type === "pending_medium"){
            this.action.doAction("todo_management.todo_item_action_pending_medium");
        } else if (type === "pending_high"){
            this.action.doAction("todo_management.todo_item_action_pending_high");
        } else {
            this.action.doAction("todo_management.todo_item_action_all");
        }
    }
}

registry.category("actions").add(
    "todo_dashboard",
    TodoDashboard
);