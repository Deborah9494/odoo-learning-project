# estate/models/estate_property_type.py

from odoo import models, fields, api


class EstatePropertyType(models.Model):
    _name = "estate.property.type"
    _description = "Estate Property Type"
    _order = "sequence, name"

    name = fields.Char(string="Property Type", required=True) 
    sequence = fields.Integer(
            string='Sequence', 
            default=10, 
            help="Used to order property types."
        )
    property_ids = fields.One2many(
        "estate.property",
        "property_type_id",
        string="Properties"
    )
    offer_ids = fields.One2many(
        "estate.property.offer", #target model
        "property_type_id", # field in the target model that points back here
        string="Offers"
    )

    offer_count = fields.Integer(
        string="Offers",
        compute="_compute_offer_count"
    )

    @api.depends("offer_ids")
    def _compute_offer_count(self):
        for record in self:
            record.offer_count = len(record.offer_ids)


    _sql_constraints = [
        (
            "unique_property_type_name",
            "UNIQUE(name)",
            "The property type name must be unique."
        ),
    ]