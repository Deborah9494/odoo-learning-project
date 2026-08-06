# estate/models/estate_property_tag.py

from odoo import models, fields

class EstatePropertyTag(models.Model):
    _name = "estate.property.tag"
    _description = "Estate Property Tag"
    _order = "name"

    name = fields.Char(string="Name", required=True)
    color = fields.Integer(string="Color")
    property_ids = fields.Many2many(
        "estate.property",
        string="Properties"
    )
    _sql_constraints = [
        (
            "unique_property_tag_name",
            "UNIQUE(name)",
            "The property tag name must be unique."
        ),
    ] 
        