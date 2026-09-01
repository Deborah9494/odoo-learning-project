# todo/models/todo_item.py

from odoo import models, fields

class TodoItem(models.Model):
    _name = "todo.item"
    _description = "Todo Item"

    name = fields.Char(string="Task Title", required=True) 

    list_id = fields.Many2one(
        "todo.list",
        string="Project",
        required=True
    )
    
    status = fields.Selection( 
        string='Status', 
        selection=[ 
            ("completed", "Completed"), 
            ("pending", "Pending")
        ],
        default="pending",
    ) 

    priority = fields.Selection( 
        string='Priority', 
        selection=[ 
            ("low", "Low"), 
            ("medium", "Medium"), 
            ("high", "High")
        ],
        default="medium",
    ) 

    due_date = fields.Date(string="Due date") 

    description = fields.Text(string="Description")