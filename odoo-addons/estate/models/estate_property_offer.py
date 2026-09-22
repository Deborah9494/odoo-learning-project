# estate/models/estate_property_offer.py
import logging
from dateutil.relativedelta import relativedelta
#from datetime import timedelta

from odoo import models, fields, api
from odoo.exceptions import UserError, ValidationError

_logger = logging.getLogger(__name__)

class EstatePropertyOffer(models.Model):
    _name = "estate.property.offer"
    _description = "Estate Property Offer"
    _order = "price desc"

    property_id = fields.Many2one(
        "estate.property",
        string="Property",
        required=True
    )

    partner_id = fields.Many2one(
        "res.partner",
        string="Partner",
        required=True
    )

    price = fields.Float(
        string="Price", 
        required=True
    )
     
    status = fields.Selection(
        string="Status",
        selection=[
            ("accepted", "Accepted"), 
            ("refused", "Refused")
        ],
        copy=False
    ) 

    property_type_id = fields.Many2one(
        "estate.property.type",
        related="property_id.property_type_id", 
        string="Type", # creates a real database column
        store=True
    )

    #create_date = fields.Datetime(readonly=True)

    validity = fields.Integer(
        string="Validity (days)",
        default=7
    )
    date_deadline = fields.Date(
        string="Deadline", 
        compute="_compute_date_deadline", # fecha creación + validez
        inverse="_inverse_date_deadline", # validez = date_deadline - fecha creación
    )


    # @api.depends("create_date", "validity")
    # def _compute_date_deadline(self):
    #     _logger.warning(">>> COMPUTE DATE DEADLINE EXECUTED <<<")
    #     for offer in self:
    #         #create_date = offer.create_date or fields.Date.today()
    #         create_date = (offer.create_date or fields.Datetime.now()).date()
    #         offer.date_deadline = create_date + timedelta(days=offer.validity)
    # def _inverse_date_deadline(self):
    #     _logger.warning(">>> INVERSE EXECUTED <<<")
    #     for offer in self:
    #         #create_date = offer.create_date or fields.Date.today()
    #         create_date = (offer.create_date or fields.Datetime.now()).date()
    #         offer.validity = (offer.date_deadline - create_date).days

    @api.depends("validity")
    def _compute_date_deadline(self):
        # _logger.warning(">>> COMPUTE DATE DEADLINE EXECUTED <<<")
        for offer in self:
            create_date = offer.create_date.date() if offer.create_date else fields.Date.today()
            offer.date_deadline = create_date + relativedelta(days=offer.validity)

    def _inverse_date_deadline(self):
        # _logger.warning(">>> INVERSE EXECUTED <<<")
        for offer in self:
            create_date = offer.create_date.date() if offer.create_date else fields.Date.today()
            offer.validity = (offer.date_deadline - create_date).days

    def action_accept(self):
        for offer in self:
            estate_property = offer.property_id

            # Accept the selected offer and refuse all the others
            for other_offer in estate_property.offer_ids:
                if other_offer == offer:
                    other_offer.status = "accepted"
                else:
                    other_offer.status = "refused"

            # Update the property
            estate_property.status = "offer_accepted"
            estate_property.buyer_id = offer.partner_id
            estate_property.selling_price = offer.price

    def action_refuse(self):
        for offer in self:
            offer.status = "refused"

    _sql_constraints = [
        (
            "check_offer_price_positive",
            "CHECK(price > 0)",
            "The offer price must be strictly positive."
        ),
    ]

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            # raise an error if the user tries to create an offer with a lower amount than an existing offer.
            offer_property = self.env["estate.property"].browse(vals["property_id"])

            if offer_property.status == "sold":
                raise UserError("Sold properties cannot receive new offers.")

            highest_offer = max(offer_property.offer_ids.mapped("price"), default=0)
            if vals["price"] <= highest_offer:
                    raise ValidationError(f"The offer must be higher than the existing offers: {highest_offer}")
            # for other_offer in offer_property.offer_ids:
            #     if vals["price"] <= other_offer.price:
            #         raise ValidationError(f"The offer must be higher than the existing offers: {other_offer.price}")
        offers = super().create(vals_list)
        for offer in offers:
            # At offer creation, set the property state to “Offer Received”.
            offer.property_id.status = "offer_received"
        return offers