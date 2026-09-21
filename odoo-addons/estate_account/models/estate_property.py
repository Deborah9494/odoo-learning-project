import logging
from odoo import models, Command

_logger = logging.getLogger(__name__)

class EstateProperty(models.Model):
    _inherit = "estate.property"

    def action_sold(self):
        _logger.warning(">>> estate_account: action_sold called <<<")

        for property in self:
            # "Does the current user have write permission on the estate.property MODEL?"
            self.check_access_rights("write")
            # current user allowed to write this particular record (this particular property)?
            property.check_access_rule("write")

            _logger.warning("reached".center(100, "="))

            self.env["account.move"].sudo().create({
                "partner_id": property.buyer_id.id, # create() doesn't accept recordsets as field values. Instead of property.buyer_id --> property.buyer_id.id
                "move_type": "out_invoice",
                "invoice_line_ids": [
                    Command.create({
                        "name": "6% of selling price",
                        "quantity": 1,
                        "price_unit": property.selling_price * 0.06,
                    }),
                    Command.create({
                        "name": "Administrative fees",
                        "quantity": 1,
                        "price_unit": 100.00,
                    }),
                ],
            })

        return super().action_sold()