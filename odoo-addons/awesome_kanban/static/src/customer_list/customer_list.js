/** @odoo-module */

import { Component, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { KeepLast } from "@web/core/utils/concurrency";
import { fuzzyLookup } from "@web/core/utils/search";

export class CustomerList extends Component {
    static template = "awesome_kanban.CustomerList";
    static props = {
        selectCustomer: {
            type: Function,
        },
    };

    setup(){
        this.orm = useService("orm");

        this.partners = useState({ data: [] });
        this.keepLast = new KeepLast();

        this.displayedPartners = useState({ data: [] });
        this.filterName = "";

        onWillStart(async () => {
            /*
            this.customers = await this.orm.searchRead(
                "res.partner", // model for contacts/customers/companies
                [], // domain: empty means no filter applied
                ["display_name"] // fields we want to read
            );
            // id is also returned, even though we only explicitly requested "display_name".
            */
           this.partners.data = await this.loadCustomers([]);
           this.displayedPartners.data = this.partners.data;
        });
    }

    loadCustomers(domain) {
        return this.orm.searchRead("res.partner", domain, ["display_name"]);
    }

    async onChangeActiveCustomers(ev) {
        /* 
            ev = the change event
            ev.target = the checkbox
            ev.target.checked = true or false
        */
        const checked = ev.target.checked;
        const domain = checked 
            ?  [["opportunity_ids", "!=", false]] 
            : [];
        this.partners.data = await this.keepLast.add(this.loadCustomers(domain));
        this.filterCustomers(this.filterName);
    }

    onCustomerFilter(ev) {
        this.filterName = ev.target.value;
        this.filterCustomers(ev.target.value);
    }

    filterCustomers(name) {
        if (name) {
            /*
            fuzzyLookup(
                WHAT the user typed,
                WHERE to search,
                WHAT property to search in
            )
            */
            this.displayedPartners.data = fuzzyLookup(
                name,
                this.partners.data,
                (partner) => partner.display_name
            );
        } else {
            this.displayedPartners.data = this.partners.data;
        }
    }


}