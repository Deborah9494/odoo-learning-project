/** @odoo-module */
import { KanbanController } from "@web/views/kanban/kanban_controller";
import { CustomerList } from "./customer_list/customer_list";

export class AwesomeKanbanController extends KanbanController {
    static components = { ...KanbanController.components, CustomerList}
    static template = "awesome_kanban.AwesomeKanbanController";

    setup() {
        super.setup();
        this.searchKey = Symbol("isFromAwesomeKanban"); // gives you a unique value.
    }

    selectCustomer(partner_id, partner_name) {
        // Get the search items that have our Awesome Kanban marker
        const customerFilters = this.env.searchModel.getSearchItems((searchItem) =>
            searchItem[this.searchKey] 
        );
        // If the previous customer filter is active, deactivate it.
        for (const customerFilter of customerFilters) {
            if (customerFilter.isActive) {
                this.env.searchModel.toggleSearchItem(customerFilter.id);
            }
        }
        // Create the new customer filter
        this.env.searchModel.createNewFilters([{
            description: partner_name,
            domain: [["partner_id", "=", partner_id]],
            [this.searchKey]: true,
        }])
    }
}