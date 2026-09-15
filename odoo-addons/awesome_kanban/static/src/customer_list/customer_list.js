/** @odoo-module */
import { Component, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { KeepLast } from "@web/core/utils/concurrency";
import { fuzzyLookup } from "@web/core/utils/search";
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
           // this.partners.data = await this.loadCustomers();
            const { length, records } = await this.loadCustomers();
            this.partners.data = records;
            this.pager.total = length;
        });

    }

    // getter
    get displayedPartners() {
        return this.filterCustomers(this.state.searchString);
    }

    async onChangeActiveCustomers(ev) {
        this.state.displayActiveCustomers = ev.target.checked;
        // this.partners.data = await this.keepLast.add(this.loadCustomers());
        this.pager.offset = 0; // Whenever the filtering condition changes, start again from page 1 (first record)

        const { length, records } =
            await this.keepLast.add(this.loadCustomers());

        this.partners.data = records;
        this.pager.total = length;
        
    }

    filterCustomers(name) {
        if (name) {
            /*
            Odoo JavaScript utility -> fuzzyLookup(
                WHAT the user typed,
                WHERE to search,
                WHAT property to search in
            )
            */
            return fuzzyLookup(name, this.partners.data, (partner) => partner.display_name);
        } else {
            return this.partners.data;
        }
    }

    loadCustomers() {
        const { limit, offset } = this.pager;

        const domain = this.state.displayActiveCustomers 
            ? [["opportunity_ids", "!=", false]] 
            : [];

        // returns array of records
        // return this.orm.searchRead(
        //     "res.partner", 
        //     domain, 
        //     ["display_name"]
        // );

        // returns: 
        /*
            {
                length,
                records
            }
        */
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
        //this.filterCustomers(this.state.searchString);
    }

    

}