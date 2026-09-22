from odoo.tests.common import TransactionCase
from odoo.exceptions import UserError
from odoo.tests import Form

class TestEstate(TransactionCase):

    def test_offer_on_sold_property(self):
        property = self.env["estate.property"].create({
            "name": "Sold Property",
            "description": "A sold property",
            "expected_price": 100000,
            "status": "sold",
        })

        partner = self.env["res.partner"].create({
            "name": "Test Buyer",
        })

        with self.assertRaises(UserError):
            self.env["estate.property.offer"].create({
                "property_id": property.id,
                "partner_id": partner.id,
                "price": 110000,
            })

    def test_sell_property_without_accepted_offer(self):
        property = self.env["estate.property"].create({
            "name": "Property Without Accepted Offer",
            "description": "A property without an accepted offer",
            "expected_price": 100000,
        })
        with self.assertRaises(UserError):
            property.action_sold()

    def test_sell_property_with_accepted_offer(self):
        property = self.env["estate.property"].create({
            "name": "Property With Accepted Offer",
            "description": "A property with an accepted offer",
            "expected_price": 100000,
        })

        partner = self.env["res.partner"].create({
            "name": "Test Buyer",
        })

        offer = self.env["estate.property.offer"].create({
            "property_id": property.id,
            "partner_id": partner.id,
            "price": 110000,
        })

        offer.action_accept()
        property.action_sold()
        self.assertEqual(property.status, "sold")

    def test_garden_unchecked_resets_fields(self):
        property = self.env["estate.property"].create({
            "name": "Garden Property",
            "description": "A property with a garden",
            "expected_price": 100000,
            "garden": True,
            "garden_area": 10,
            "garden_orientation": "north",
        })

        with Form(property) as form:
            form.garden = False

        self.assertEqual(property.garden_area, 0)
        self.assertFalse(property.garden_orientation)