/** @odoo-module */
import { registry } from "@web/core/registry";
import { reactive } from "@odoo/owl";
// Odoo service
const clickerService = {
    start(env) {
        const state = reactive({ clicks: 0 });
        function increment(inc) {
            state.clicks += inc;
        }
        // service itself is listening for global clicks
        document.addEventListener(
            "click", 
            () => increment(1), 
            true 
        );
        // Components using this service are allowed to access state and increment
        return {
            state,
            increment,
        };       
    },
};
registry.category("services").add(
    "awesome_clicker.clicker", 
    clickerService
);