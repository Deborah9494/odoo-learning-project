/** @odoo-module **/
import { Component } from "@odoo/owl";
import { ChartComponent } from "../chart_component/chart_component";

export class ChartCard extends Component {
    static template = "todo_management.ChartCard";
    static props = {
        title: String,
        data: Object,
        type: String,
        className: String,
        onItemClick: { type: Function, optional: true },
    };
    static components = { 
        ChartComponent,
    };
}