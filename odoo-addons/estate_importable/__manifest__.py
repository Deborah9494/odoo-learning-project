{
    "name": "Estate Importable",
    "depends": [
        "base",
        "base_import_module",
        "base_automation",
        "website",
    ],
    "data": [
        "models/estate_property_type.xml",
        "models/estate_property_tag.xml",
        "models/estate_property.xml",
        "models/estate_property_offer.xml",
        "security/ir.model.access.csv",
        "security/estate_property_rules.xml",
        "actions/estate_property_offer_actions.xml",
        "actions/estate_actions.xml",
        "views/estate_property_type_views.xml",
        "views/estate_property_tag_views.xml",
        "views/estate_property_offer_views.xml",
        "views/estate_property_views.xml",
        "views/website_property_templates.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "estate_importable/static/src/js/tour.js",
        ],
    },
}