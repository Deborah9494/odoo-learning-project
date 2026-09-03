/** @odoo-module **/
import { Component, useState } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";
import { CheckBox } from "@web/core/checkbox/checkbox";
import { browser } from "@web/core/browser/browser";

export class ConfigurationDialog extends Component {
    static template = "todo_management.ConfigurationDialog";
    static components = { 
        Dialog, 
        CheckBox 
    };
    static props = {
        close: Function,
        items: Array,
        disabledItems: Array,
        onUpdateConfiguration: Function,
    };
    setup() {
        // We add an "enabled" property to every item.
        // If the item's ID is NOT in disabledItems:
        //     enabled = true
        // If the item's ID IS in disabledItems:
        //     enabled = false
        this.items = useState(
            this.props.items.map((item) => {
            return {
                ...item, // ... copy all the existing properties of this item
                enabled: !this.props.disabledItems.includes(item.id),
            }
        }));
    }
    done() {
        this.props.close();
    }
    onChange(checked, changedItem) {
        // Update the enabled value of the item
        // whose checkbox was changed.
        changedItem.enabled = checked;
        // Find all items that are disabled.
        const newDisabledItems = this.items
            .filter((item) => !item.enabled)
            .map((item) => item.id);

        // Save the disabled IDs in the browser.
        browser.localStorage.setItem(
            "disabledDashboardItems",
            newDisabledItems,
        );
        // Tell the Dashboard that the configuration changed.
        this.props.onUpdateConfiguration(newDisabledItems);
    }
}