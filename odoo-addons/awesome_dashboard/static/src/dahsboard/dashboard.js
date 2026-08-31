/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { DashboardItem } from "./dashboard_item/dashboard_item";
import { browser } from "@web/core/browser/browser";
import { ConfigurationDialog } from "./dashboard_settings/dashboard_settings";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";

    static components = { 
        Layout,
        DashboardItem,
    };

    setup() {
        this.display = {
            controlPanel: {},
        };
        this.action = useService("action");
        // The statistics service is reactive,
        // so the Dashboard subscribes to its changes.
        this.statistics = useState(useService("awesome_dashboard.statistics"));
        // Service used to open dialogs.
        this.dialog = useService("dialog");        
        // Get ALL dashboard items from the registry.
        this.items = registry.category("awesome_dashboard").getAll();
        // Read the IDs of disabled items from localStorage. 
        // If nothing has been saved yet, use [].
        // Why useState? Because we want the dashboard to 
        //  react when disabledItems changes.
        this.state = useState({
            disabledItems: 
                browser.localStorage
                    .getItem("disabledDashboardItems")?.split(",") || []
        });
    }

    // Open the configuration dialog, passing:
    // - all dashboard items
    // - the IDs currently disabled
    // - a function the dialog can call when the configuration changes
    openConfiguration() {
        this.dialog.add(ConfigurationDialog, {
            items: this.items,
            disabledItems: this.state.disabledItems,
            onUpdateConfiguration: 
                this.updateConfiguration.bind(this),
        })
    }

    // Update the reactive state of the Dashboard.
    // Because state was created with useState(),
    // Owl notices this change and rerenders the Dashboard.
    updateConfiguration(newDisabledItems) {
        this.state.disabledItems = newDisabledItems;
    }
    
    openCustomers() {
        this.action.doAction("base.action_partner_form");
    }
    openLeads() {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "All leads",
            res_model: "crm.lead",
            views: [
                [false, "list"],
                [false, "form"],
            ],
        });
    }
}


// dashboard.js is a componenent that will be loader later by LazyComponent
registry.category("lazy_components").add(
    "AwesomeDashboard",
    AwesomeDashboard
);
