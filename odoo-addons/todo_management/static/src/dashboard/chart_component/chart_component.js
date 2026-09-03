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
            if (nextProps.data.labels && nextProps.data.datasets) {
                this.chart.data.labels = nextProps.data.labels;

                this.chart.data.datasets = nextProps.data.datasets.map(
                    (dataset, index) => ({
                        ...dataset,
                        backgroundColor: getColor(index),
                    })
                );
            } else {
                this.chart.data.labels = Object.keys(nextProps.data);

                this.chart.data.datasets = [
                    {
                        label: nextProps.label,
                        data: Object.values(nextProps.data),
                        backgroundColor: this.chart.data.labels.map(
                            (_, index) => getColor(index)
                        ),
                    },
                ];
            }

            this.chart.update();
        });

    // Destroy the Chart.js instance when the component is removed
        onWillUnmount(() => {
            this.chart.destroy();
        });
    }

    renderChart() {
        // console.log(this.props.data);

        let labels;
        let datasets;

        if (this.props.data.labels && this.props.data.datasets) {
            // Multiple datasets
            /*
                {
                    labels: ["Project A", "Project B", "Project C"],

                    datasets: [
                        {
                            label: "Pending",
                            data: [3, 0, 2],
                        },
                        {
                            label: "Completed",
                            data: [0, 0, 1],
                        },
                    ],
                }
            */
            labels = this.props.data.labels;
            datasets = this.props.data.datasets.map((dataset, index) => ({
                ...dataset,
                backgroundColor: getColor(index),
            }));
        } else {
            // Single dataset
            /*
            {
                Low: 3,
                Medium: 5,
                High: 2
            }
            */

            labels = Object.keys(this.props.data);
            const data = Object.values(this.props.data);

            datasets = [
                {
                    label: this.props.label,
                    data: data,
                    backgroundColor: labels.map((_, index) => getColor(index)),
                },
            ];
        }

        this.chart = new Chart(this.canvasRef.el, {
            type: this.props.type,

            data: {
                labels: labels,
                datasets: datasets,
            },

            options: {
                plugins: {
                    legend: {
                        display: this.props.type === "pie"
                            || datasets.length > 1,
                    },
                },

                onClick: (event, elements) => {
                    if (!elements.length) {
                        return;
                    }

                    const element = elements[0];

                    const index = element.index;
                    const datasetIndex = element.datasetIndex;

                    const label = this.chart.data.labels[index];

                    this.props.onItemClick?.(
                        label,
                        datasetIndex
                    );
                },
            },
        });
    }

   

}
