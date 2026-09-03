/** @odoo-module **/

import { Component, onWillStart } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";

import { ChartCard } from "../dashboard/chart_card/chart_card";
import { TodoDashboardItem } from "../dashboard/todo_dashboard_item/todo_dashboard_item";

export class ProjectDashboard extends Component {
    static template = "todo_management.ProjectDashboard";

    static components = {
        Layout,
        ChartCard,
        TodoDashboardItem,
    };

    setup() {

        this.display = {
            controlPanel: {},
        };

        this.orm = useService("orm");

        this.data = {
            labels: [],
            datasets: [],
        };

        onWillStart(async () => {
            const projects = await this.orm.call(
                "todo.list",
                "get_projects_dashboard_data",
                []
            );

            const projectIds = Object.keys(projects);

            this.data.labels = projectIds.map(
                (id) => projects[id].name
            );

            this.data.datasets = [
                {
                    label: "Pending",
                    data: projectIds.map(
                        (id) => projects[id].pending
                    ),
                },
                {
                    label: "Completed",
                    data: projectIds.map(
                        (id) => projects[id].completed
                    ),
                },
            ];
        });
    }
}

registry.category("actions").add(
    "todo_project_dashboard",
    ProjectDashboard
);