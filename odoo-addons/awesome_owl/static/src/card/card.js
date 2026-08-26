/** @odoo-module **/
import { Component, useState } from "@odoo/owl";
export class Card extends Component {
    static template = "awesome_owl.Card";
    static props = {
        title: String,
        slots: {
            type: Object,
            shape: {
                default: true
            },
        }
    };
    setup() {
        this.isOpen = useState({ 
            value: true 
        });
    }

    toggleContent() {
        this.isOpen.value = !this.isOpen.value;
    }
}