# res_user.py
from odoo import models, fields

class ResUsers(models.Model):
    _inherit = "res.users"

    todo_list_ids = fields.One2many(
        "todo.list",
        "user_id",
        string="Todo Lists",
    )