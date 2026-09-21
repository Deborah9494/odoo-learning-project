# estate/models/estate_property.py
from dateutil.relativedelta import relativedelta

from odoo import models, fields, api
from odoo.exceptions import UserError, ValidationError

class EstateProperty(models.Model):
    _name = "estate.property"
    _description = "Estate Property"
    _order = "id desc"


    name = fields.Char(string="Title", required=True) 
    description = fields.Text(string="Description", required=True)
    postcode = fields.Char(string="Postcode")
    date_availability = fields.Date(
        string="Available From",
        copy=False, # When the property is duplicated, this field is not copied
        default=lambda self: fields.Date.today() + relativedelta(months=3) # for each row: availability date = today + 3 months
    )

    expected_price = fields.Float(string="Expected Price", required=True)
    selling_price = fields.Float(
        string="Selling Price",
        readonly=True, # El usuario no debe escribir el precio de venta manualmente. Más adelante, cuando una oferta sea aceptada, se actualizará automáticamente
        copy=False 
    )

    bedrooms = fields.Integer(
        string="Bedrooms",
        default=2
    )
    living_area = fields.Integer(string="Living Area (sqm)")
    facades = fields.Integer(string="Facades")

    garage = fields.Boolean(string="Garage")
    garden = fields.Boolean(string="Garden")
    garden_area = fields.Integer(string="Garden Area (sqm)")
    #garden_orientation = fields.Char(string="Garden Orientation")
    garden_orientation = fields.Selection(
        string='Garden Orientation',
        selection=[
            ("north", "North"), 
            ("south", "South"),
            ("east", "East"),
            ("west", "West")
        ])

    active = fields.Boolean(
        default=True
    )

    status = fields.Selection(
        selection=[
            ("new", "New"),
            ("offer_received", "Offer Received"),
            ("offer_accepted", "Offer Accepted"),
            ("sold", "Sold"),
            ("cancelled", "Cancelled"),
        ],
        string="Status",
        required=True,
        copy=False,
        default="new",
    )

    property_type_id = fields.Many2one(
        "estate.property.type",
        string="Property Type"
    )
    
    buyer_id = fields.Many2one(
        "res.partner",
        string="Buyer",
        readonly=True
    )

    salesperson_id = fields.Many2one(
        "res.users",
        string="Salesman"
    )

    tag_ids = fields.Many2many(
        "estate.property.tag",
        string="Tags"
    )

    offer_ids = fields.One2many(
        "estate.property.offer",
        "property_id",
        string="Offers"
    )

    total_area = fields.Integer(
        string="Total Area",
        compute="_compute_total_area"
    )

    best_price = fields.Float(
        string="Best Price",
        compute="_compute_best_price"
    )

    company_id = fields.Many2one(
        "res.company",
        groups="estate.estate_group_manager",
        required=True,
        default=lambda self: self.env.company,
    )

    @api.depends("living_area", "garden_area")
    def _compute_total_area(self):
        for property in self:
            property.total_area = property.living_area + property.garden_area

    @api.depends("offer_ids.price")
    def _compute_best_price(self):
        for property in self:
            best_price = 0.0
            for offer in property.offer_ids:
                if best_price < offer.price:
                    best_price = offer.price
            property.best_price = best_price

    @api.onchange("garden")
    def _onchange_garden(self):
        for property in self:
            if property.garden:
                property.garden_area = 10
                property.garden_orientation = "north"
            else:
                property.garden_area = 0
                property.garden_orientation = False

    def action_sold(self):
        for property in self:
            if property.status == "cancelled":
                raise UserError("Cancelled properties cannot be sold")
            property.status = "sold"

    def action_cancel(self):
        for property in self:
            if property.status == "sold":
                raise UserError("Sold properties cannot be cancelled")
            property.status = "cancelled"

    _sql_constraints = [
        (
            "check_expected_price_positive",
            "CHECK(expected_price > 0)",
            "The expected price must be strictly positive."
        ),
        (
            "check_selling_price_postive",
            "CHECK(selling_price > 0)",
            "The selling price must be strictly positive."
        ),
    ]
    
    @api.constrains("expected_price", "selling_price")
    def _check_selling_price(self):
        for estate_property in self:
            if (
                estate_property.selling_price > 0
                and estate_property.selling_price < estate_property.expected_price * 0.9
            ):
                raise ValidationError(
                    "The selling price cannot be lower than 90% of the expected price."
                )

    @api.ondelete(at_uninstall=False)
    def _check_state_before_delete(self):
        for record in self:
            if record.status not in ("new", "cancelled"):
                raise UserError("Only new and cancelled properties can be deleted.")