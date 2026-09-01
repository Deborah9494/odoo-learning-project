/** @odoo-module **/

import { NumberCard } from "./number_card/number_card";
import { registry } from "@web/core/registry";

export const items = [
    {
        id: "total_tasks",
        description: "Total number of tasks",
        Component: NumberCard,
        props: (data, openTasks) => ({
            title: "Total Tasks",
            value: data.total,
            domain: "all",
            onClick: openTasks,
            className: "",
        }),
    },
    {
        id: "pending_tasks",
        description: "Number of pending tasks",
        Component: NumberCard,
        props: (data, openTasks) => ({
            title: "Pending",
            value: data.pending,
            domain: "pending",
            onClick: openTasks,
            className: "text-warning",
        }),
    },
    {
        id: "completed_tasks",
        description: "Number of completed tasks",
        Component: NumberCard,
        props: (data, openTasks) => ({
            title: "Completed",
            value: data.completed,
            domain: "completed",
            onClick: openTasks,
            className: "text-success",
        }),
    },
    {
        id: "overdue_tasks",
        description: "Number of overdue tasks",
        Component: NumberCard,
        props: (data, openTasks) => ({
            title: "Overdue",
            value: data.overdue,
            domain: "overdue",
            onClick: openTasks,
            className: "text-danger",
        }),
    },
];

const dashboardRegistry = registry.category("todo_dashboard");

items.forEach((item) => {
    dashboardRegistry.add(item.id, item);
});