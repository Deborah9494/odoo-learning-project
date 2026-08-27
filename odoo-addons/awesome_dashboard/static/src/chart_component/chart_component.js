/** @odoo-module **/
import { Component, onWillStart, onMounted, onWillUnmount, useRef } from "@odoo/owl";
import { loadJS } from "@web/core/assets";
import { getColor } from "@web/core/colors/colors";

export class ChartComponent extends Component {
    static template = "awesome_dashboard.ChartComponent";

    static props = {
        type: String,
        label: String,
        data: Object,
    };

    setup() {
        // reference to the canvas
        this.canvasRef = useRef("canvas");
        onWillStart(async () => {
            // chart: load Chart.js
            await loadJS("/web/static/lib/Chart/Chart.js");
        }); 
        // chart: on mounted (when DOM actually exists): create chart
        onMounted(() => {
            this.renderChart();
        });
        onWillUnmount(() => {
            this.chart.destroy();
        });
    }

    renderChart(){
        console.log(this.props.data);
        const labels = Object.keys(this.props.data);
        const data = Object.values(this.props.data);
        const color = labels.map((_, index) => getColor(index)); // Creates an array of colors by assigning each label a color from Odoo’s standard color palette.

        this.chart = new Chart(this.canvasRef.el, {
            type: this.props.type,
            data: {
                labels: labels,
                datasets: [
                    {
                        label: this.props.label,
                        data: data,
                        backgroundColor: color,
                    },
                ],
            },
        });
    }

   

}
