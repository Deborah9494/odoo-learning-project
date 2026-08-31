# todo/models/todo_item.py

from odoo import models, fields

class TodoItem(models.Model):
    _name = "todo.item"
    _description = "Todo Item"

    name = fields.Char(string="Title", required=True) 

    list_id = fields.Many2one(
        "todo.list",
        string="Todo List",
        required=True
    )

    completed = fields.Boolean(
        string="Completed",
        default=False
    )