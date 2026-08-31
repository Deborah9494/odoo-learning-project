/** @odoo-module */

import { registry } from "@web/core/registry";

import { NumberCard } from "./number_card/number_card";
import { ChartCard } from "./chart_card/chart_card";

const dashboardRegistry = registry.category("awesome_dashboard");

dashboardRegistry.add("average_quantity", {
    id: "average_quantity",
    description: "Average amount of t-shirt",
    Component: NumberCard,
    size: 1,
    props: (data) => ({
        title: "Average amount of t-shirt by order this month",
        value: data.average_quantity,
    }),
});

dashboardRegistry.add("average_time", {
    id: "average_time",
    description: "Average order processing time",
    Component: NumberCard,
    props: (data) => ({
        title: "Average time for an order to go from 'new' to 'sent' or 'cancelled'",
        value: data.average_time,
    }),
});

dashboardRegistry.add("nb_new_orders", {
    id: "nb_new_orders",
    description: "Number of new orders",
    Component: NumberCard,
    size: 1,
    props: (data) => ({
        title: "Number of new orders this month",
        value: data.nb_new_orders,
    }),
});

dashboardRegistry.add("nb_cancelled_orders", {
    id: "nb_cancelled_orders",
    description: "Number of cancelled orders",
    Component: NumberCard,
    size: 1,
    props: (data) => ({
        title: "Number of cancelled orders this month",
        value: data.nb_cancelled_orders,
    }),
});

dashboardRegistry.add("total_amount", {
    id: "total_amount",
    description: "Total amount of new orders",
    Component: NumberCard,
    size: 1,
    props: (data) => ({
        title: "Total amount of new orders this month",
        value: data.total_amount,
    }),
});

dashboardRegistry.add("nb_shirts_orders_by_size_s", {
    id: "nb_shirts_orders_by_size_s",
    description: "Number of shirt orders by size S",
    Component: NumberCard,
    props: (data) => ({
        title: "Number of shirt orders by size S",
        value: data.orders_by_size?.s ?? 0,
    }),
});

dashboardRegistry.add("orders_by_size", {
    id: "orders_by_size",
    description: "Shirt orders by size",
    Component: ChartCard,
    size: 2,
    props: (data) => ({
        title: "Shirt orders by size",
        data: data.orders_by_size,
        type: "bar",
    }),
});

/*

export const items = [
    {
        id: "average_quantity",
        description: "Average amount of t-shirt",
        Component: NumberCard,
        props: (data) => ({
            title: "Average amount of t-shirt by order this month",
            value: data.average_quantity,
        }),
    },
    {
        id: "average_time",
        description: "Average order processing time",
        Component: NumberCard,
        props: (data) => ({
            title: "Average time for an order to go from 'new' to 'sent' or 'cancelled'",
            value: data.average_time,
        }),
    },
    {
        id: "new_orders",
        description: "Number of new orders",
        Component: NumberCard,
        props: (data) => ({
            title: "Number of new orders this month",
            value: data.nb_new_orders,
        }),
    },
    {
        id: "cancelled_orders",
        description: "Number of cancelled orders",
        Component: NumberCard,
        props: (data) => ({
            title: "Number of cancelled orders this month",
            value: data.nb_cancelled_orders,
        }),
    },
    {
        id: "total_amount",
        description: "Total amount of new orders",
        Component: NumberCard,
        props: (data) => ({
            title: "Total amount of new orders this month",
            value: data.total_amount,
        }),
    },
    {
        id: "shirts_orders_by_size_s",
        description: "Number of shirt orders by size S",
        Component: NumberCard,
        props: (data) => ({
            title: "Number of shirt orders by size S",
            value: data.orders_by_size?.s ?? 0,
        }),
    },
    {
        id: "orders_by_size",
        description: "Shirt orders by size",
        Component: ChartCard,
        size: 2,
        props: (data) => ({
            title: "Shirt orders by size",
            data: data.orders_by_size,
            type: "bar"
        }),
    },
];

items.forEach(item => {
    registry.category("awesome_dashboard").add(item.id, item);
});

*/