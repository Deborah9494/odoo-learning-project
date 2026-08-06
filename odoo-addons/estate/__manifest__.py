# __manifest__.py
{
    "name": "Estate",          # Nombre visible
    "version": "1.0",          # Versión
    "depends": ["base"],       # Dependencias
    "author": "Deborah Iori",  # Autor
    "category": "Real Estate", # Categoría
    "summary": "Learning Odoo",# Descripción corta
    "data": [
        "security/ir.model.access.csv",
        "views/estate_property_views.xml",
        "views/estate_property_type_views.xml",
        "views/estate_property_tag_views.xml",
        "views/estate_property_offer_views.xml"
    ],                # XML, CSV...
    "installable": True,       # Se puede instalar
    "application": True,       # Aparece como aplicación
}