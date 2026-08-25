/** @odoo-module **/
import { Component, useState } from "@odoo/owl";
export class Counter extends Component {
    static template = "awesome_owl.Counter";
    // prop validation
    static props = {
        onChange: { type: Function, optional: true },
    }
    setup() {
        this.state = useState({ 
            value: 1 
        });
    }
    increment() {
        this.state.value++;
        // if the parent gave an onChange function, call it
        if (this.props.onChange) {
            this.props.onChange();
        }
    }
    
}
