/** @odoo-module */
import { Component, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { KeepLast } from "@web/core/utils/concurrency";
import { Pager } from "@web/core/pager/pager";
export class CustomerList extends Component {
    static template = "awesome_kanban.CustomerList";
    static components = { Pager };
    static props = {
        selectCustomer: {
            type: Function,
        },
    };
    setup(){
        this.orm = useService("orm");
        this.partners = useState({ data: [] });
        this.keepLast = new KeepLast();
        this.pager = useState({ offset: 0, limit: 20 });
        
        this.state = useState({
            searchString: "",
            displayActiveCustomers: false,
        })

        onWillStart(async () => {
            const { length, records } = await this.loadCustomers();
            this.partners.data = records;
            this.pager.total = length;
        });

    }

    async onChangeActiveCustomers(ev) {
        this.state.displayActiveCustomers = ev.target.checked;
        this.pager.offset = 0; // Whenever the filtering condition changes, start again from page 1 (first record)
        const { length, records } =
            await this.keepLast.add(this.loadCustomers());
        this.partners.data = records;
        this.pager.total = length;
    }

    // when the user searches, reset paging
    async onCustomerSearch() { 
        this.pager.offset = 0; 
        const { length, records } = 
            await this.keepLast.add(this.loadCustomers()); 
        this.partners.data = records; 
        this.pager.total = length; 
    }

    async loadCustomers() {
        const { limit, offset } = this.pager;
        const domain = []; 
        // if Active customers is enabled, add that condition.
        if (this.state.displayActiveCustomers) { 
            domain.push(["opportunity_ids", "!=", false]); 
        } 
        // if the user typed something, add the search condition.
        // if (this.state.searchString) { 
        //     domain.push(["display_name", "ilike", this.state.searchString]); 
        // }
        if (this.state.searchString) {
            domain.push(
                "|",
                ["name", "ilike", this.state.searchString],
                ["parent_id.name", "ilike", this.state.searchString]
            );
        }
        return this.orm.webSearchRead("res.partner", domain, {
            // field specification for the records we want returned
            specification: {
                "display_name": {},
            },
            limit,
            offset,
        })
    }

    async onUpdatePager(newState) {
        Object.assign(this.pager, newState);
        const { records } = await this.loadCustomers();
        this.partners.data = records;
    }

    

}