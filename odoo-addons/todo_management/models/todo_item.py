# todo/models/todo_item.py

from odoo import models, fields, api

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

    due_status = fields.Selection(
        [
            ("overdue", "Overdue"),
            ("today", "Due Today"),
            ("future", "Upcoming"),
        ],
        string="Due Status",
        compute="_compute_due_status",
    )

    @api.depends("due_date", "status")
    def _compute_due_status(self):
        today = fields.Date.today()

        for item in self:
            if item.status == "completed":
                item.due_status = False
            elif not item.due_date:
                item.due_status = False
            elif item.due_date < today:
                item.due_status = "overdue"
            elif item.due_date == today:
                item.due_status = "today"
            else:
                item.due_status = "future"

    @api.model
    def get_dashboard_data(self):
        today = fields.Date.today()
        return {
            "total": self.search_count([]),
            "pending": self.search_count([
                ("status", "=", "pending")
            ]),
            "completed": self.search_count([
                ("status", "=", "completed")
            ]),
            "overdue": self.search_count([
                ("status", "=", "pending"),
                ("due_date", "<", today),
            ]),
            "due_today": self.search_count([
                ("status", "=", "pending"),
                ("due_date", "=", today),
            ]),
            "status_data": {
                "Pending": self.search_count([
                    ("status", "=", "pending")
                ]),
                "Completed": self.search_count([
                    ("status", "=", "completed")
                ]),
            },
            "priority_data": {
                "Low": self.search_count([
                    ("status", "=", "pending"),
                    ("priority", "=", "low"),
                ]),
                "Medium": self.search_count([
                    ("status", "=", "pending"),
                    ("priority", "=", "medium"),
                ]),
                "High": self.search_count([
                    ("status", "=", "pending"),
                    ("priority", "=", "high"),
                ]),
            },
        }