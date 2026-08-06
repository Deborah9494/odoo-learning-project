# res_user.py
from odoo import models, fields

class ResUsers(models.Model):
    _inherit = "res.users"

    property_ids = fields.One2many(
        "estate.property",
        "salesperson_id",
        domain=[
            ("status", "not in", ["sold", "cancelled"])
        ]
    )