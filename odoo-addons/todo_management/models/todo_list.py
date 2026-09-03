# estate/models/todo_list.py

from odoo import models, fields, api

class TodoList(models.Model):
    _name = "todo.list"
    _description = "Todo List"
    _order = "id desc"

    name = fields.Char(string="Project Title", required=True) 
    description = fields.Text(string="Project Description", required=True)
    
    active = fields.Boolean(
        default=True
    )

    user_id = fields.Many2one(
        "res.users",
        string="Owner"
    )

    item_ids = fields.One2many(
        "todo.item",
        "list_id",
        string="Tasks"
    )

    @api.model
    def get_projects_dashboard_data(self):
        projects = self.search([])
        projects_data = {}

        for project in projects:
            projects_data[project.id] = {
                "name": project.name,
                "pending": 0,
                "completed": 0,
                "total": len(project.item_ids),
            }
            for task in project.item_ids:
                if task.status == "pending":
                    projects_data[project.id]["pending"] += 1
                elif task.status == "completed":
                    projects_data[project.id]["completed"] += 1

        return projects_data


