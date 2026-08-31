/** @odoo-module **/
import { Component } from "@odoo/owl";
import { ChartComponent } from "../chart_component/chart_component";

export class ChartCard extends Component {
    static template = "awesome_dashboard.ChartCard";
    static props = {
        title: String,
        data: Object,
        type: String,
    };
    static components = { 
        ChartComponent,
    };
}