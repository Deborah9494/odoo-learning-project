# estate/models/todo_list.py

from odoo import models, fields

class TodoList(models.Model):
    _name = "todo.list"
    _description = "Todo List"
    _order = "id desc"

    name = fields.Char(string="Title", required=True) 
    description = fields.Text(string="Description", required=True)
    
    active = fields.Boolean(
        default=True
    )

    user_id = fields.Many2one(
        "res.users",
        string="User"
    )

    item_ids = fields.One2many(
        "todo.item",
        "list_id",
        string="Items"
    )
