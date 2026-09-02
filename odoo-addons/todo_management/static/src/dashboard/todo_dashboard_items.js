/** @odoo-module **/

import { NumberCard } from "./number_card/number_card";
import { ChartCard } from "./chart_card/chart_card";
import { registry } from "@web/core/registry";

export const items = [
    {
        id: "total_tasks",
        description: "Total number of tasks",
        Component: NumberCard,
        size: 1,
        props: (data, openTasks) => ({
            title: "Total Tasks",
            value: data.total,
            domain: "all",
            onClick: openTasks,
            className: "",
        }),
    },
    {
        id: "duetoday_tasks",
        description: "Number of due today tasks",
        Component: NumberCard,
        size: 1,
        props: (data, openTasks) => ({
            title: "Due Today",
            value: data.due_today,
            domain: "duetoday",
            onClick: openTasks,
            className: "text-warning",
        }),
    },
    {
        id: "overdue_tasks",
        description: "Number of overdue tasks",
        Component: NumberCard,
        size: 1,
        props: (data, openTasks) => ({
            title: "Overdue",
            value: data.overdue,
            domain: "overdue",
            onClick: openTasks,
            className: "text-danger",
        }),
    },
    {
        id: "tasks_by_status",
        description: "Tasks by status",
        Component: ChartCard,
        size: 2,
        props: (data, openTasks) => ({
            title: "Tasks by status",
            type: "pie",
            data: data.status_data,

            onItemClick: (label) => {
                const actions = {
                    Pending: "pending",
                    Completed: "completed",
                };

                openTasks(actions[label]);
            },
        }),
    },
    {
        id: "pending_tasks_by_priority",
        description: "Pending Tasks by priority",
        Component: ChartCard,
        size: 2,
        props: (data, openTasks) => ({
            title: "Pending Tasks by priority",
            type: "bar",
            data: data.priority_data,

            onItemClick: (label) => {
                const actions = {
                    Low: "pending_low",
                    Medium: "pending_medium",
                    High: "pending_high",
                };

                openTasks(actions[label]);
            },
        }),
    },
];

const dashboardRegistry = registry.category("todo_dashboard");

items.forEach((item) => {
    dashboardRegistry.add(item.id, item);
});