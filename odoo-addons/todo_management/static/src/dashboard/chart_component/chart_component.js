/** @odoo-module **/
import { 
    Component, 
    onWillStart, 
    onMounted, 
    onWillUnmount, 
    onWillUpdateProps,
    useRef 
} from "@odoo/owl";
import { loadJS } from "@web/core/assets";
import { getColor } from "@web/core/colors/colors";

export class ChartComponent extends Component {
    static template = "todo_management.ChartComponent";

    static props = {
        type: String,
        label: String,
        data: Object,
        class: { type: String, optional: true },
        onItemClick: { type: Function, optional: true },
    };

    setup() {
        // reference to the canvas
        this.canvasRef = useRef("canvas");
        
        // Load Chart.js before the component starts
        onWillStart(async () => {
            await loadJS("/web/static/lib/Chart/Chart.js");
        }); 

        // // Create the chart when the canvas exists in the DOM
        onMounted(() => {
            this.renderChart();
        });

        // Update the existing chart when the data props change
        onWillUpdateProps((nextProps) => {
            this.chart.data.labels = Object.keys(nextProps.data);
            this.chart.data.datasets[0].data = Object.values(nextProps.data);
            this.chart.update();
        });

    // Destroy the Chart.js instance when the component is removed
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
            options: {
                onClick: (event, elements) => {
                    if (!elements.length) {
                        return;
                    }

                    // which section was clicked
                    const index = elements[0].index;
                    // label of the cliked section
                    const label = this.chart.data.labels[index];
                    // calls the function supplied by ChartCard
                    this.props.onItemClick?.(label);
                },
            },
        });
    }

   

}
