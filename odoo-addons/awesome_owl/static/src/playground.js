/** @odoo-module **/
import { Component, markup, useState } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { Card } from "./card/card";
import { TodoList } from "./todo/todo_list";
export class Playground extends Component {
    static template = "awesome_owl.playground";
    static components = {
        Counter,
        Card,
        TodoList
    };
    setup() {
        this.normalText = "<strong>Normal string</strong>";
        this.htmlText = markup("<strong>Markuped string</strong>")
        // local state value (sum)
        this.sum = useState({
            value: 2,
        });
    }
    incrementSum(){
        this.sum.value++;
    }
    
}
