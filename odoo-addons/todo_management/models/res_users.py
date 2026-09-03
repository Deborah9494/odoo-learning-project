# res_user.py
from odoo import models, fields, api

class ResUsers(models.Model):
    _inherit = "res.users"

    todo_list_ids = fields.One2many(
        "todo.list",
        "user_id",
        string="Todo Lists",
    )

    todo_dashboard_disabled_items = fields.Text(
        string="Todo Dashboard Disabled Items",
        default="",
    )

    @api.model
    def get_todo_dashboard_configuration(self):
        value = self.env.user.todo_dashboard_disabled_items

        if not value:
            return []

        return value.split(",")

    @api.model
    def set_todo_dashboard_configuration(self, disabled_items):
        self.env.user.todo_dashboard_disabled_items = ",".join(disabled_items)