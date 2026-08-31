/** @odoo-module */
import { registry } from "@web/core/registry";
import { reactive } from "@odoo/owl";

// Odoo service
const statisticsService = {
    dependencies: ["rpc"],
    start(env, { rpc }) {
        // create the reactive object
        const statistics = reactive({ isReady: false });

        // function that loads the data
        async function loadStatistics() {
            const newStatistics = await rpc("/awesome_dashboard/statistics");
            // updating existing reactive obj: take all the properties from newStatistics and copy them into statistics
            // Object.assign(destination, source1, source2, source3);
            Object.assign(
                statistics, 
                newStatistics, 
                { isReady: true }
            );
        };
        
        // refresh every 10 seconds
        setInterval(loadStatistics, 10 * 1000);
        // refresh every 10 minutes
        // setInterval(loadStatistics, 10*60*1000);
        loadStatistics();
        
        return statistics;
        
    },
};
registry.category("services").add("awesome_dashboard.statistics", statisticsService);