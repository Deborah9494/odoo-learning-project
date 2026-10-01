# __manifest__.py
{
    "name": "Estate",          # Nombre visible
    "version": "1.0",          # Versión
    "depends": [
        "base",
        "website",
    ],       # Dependencias
    "author": "Deborah Iori",  # Autor
    "category": "Real Estate/Brokerage", # Categoría
    "summary": "Learning Odoo",# Descripción corta
    "data": [
        'security/security.xml',
        "security/ir.model.access.csv",
        "views/estate_property_views.xml",
        "views/estate_property_type_views.xml",
        "views/estate_property_tag_views.xml",
        "views/estate_property_offer_views.xml",
        'views/res_users_views.xml',
        "views/estate_menus.xml",
        "views/estate_templates.xml",
        'data/estate.property.type.csv',
    ],
    "demo": [
        "demo/estate_property_demo.xml",
    ],
    "installable": True,       # Se puede instalar
    "application": True,       # Aparece como aplicación
}