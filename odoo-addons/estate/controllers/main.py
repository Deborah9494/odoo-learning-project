from odoo import http
from odoo.http import request

class EstateController(http.Controller):
    @http.route(
        "/actions/api/estate",
        type="http",
        auth="public",
        methods=["GET"],
    )
    def get_properties(self):
        properties = request.env["estate.property"].search([
            ("api_published", "=", True)
        ])
        data = []
        for property in properties:
            data.append({
                "id": property.id,
                "name": property.name,
                "expected_price": property.expected_price,
            })
        return request.make_json_response(data)
    @http.route(
        "/properties",
        type="http",
        auth="public",
        website=True,
    )
    def properties(self):
        properties = request.env["estate.property"].search([
            ("api_published", "=", True)
        ])

        return request.render(
            "estate.properties_page",
            {"properties": properties},
        )