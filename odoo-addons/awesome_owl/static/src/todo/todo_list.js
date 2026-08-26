/** @odoo-module **/
import { Component, useState } from "@odoo/owl";
import { TodoItem } from "./todo_item";
import { useAutofocus } from "../utils"
export class TodoList extends Component {
    static template = "awesome_owl.TodoList";

    static components = {
        TodoItem,
    };
    
    setup() {
        this.nextId = 0;
        this.todos = useState([]);
        
        useAutofocus("addTodoInput");
    }

    addTodo(ev) {
        if (ev.keyCode === 13 && ev.target.value != ""){
            this.todos.push(
                { id: this.nextId++, description: ev.target.value, isCompleted: false }
            );
            ev.target.value = "";
        }
    }

    toggleTodo(todoId){
        for (const todo of this.todos) {
            if (todo.id === todoId) {
                todo.isCompleted = !todo.isCompleted;
                break;
            }
        }
    }

    removeTodo(todoId){
        // find the index of the element to delete
        const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);
        if (todoIndex >= 0) {
            // remove the element at index from this.todos
            this.todos.splice(todoIndex, 1);
        }
    }
}
