# __manifest__.py
{
    "name": "Todo Management",          # Nombre visible
    "version": "1.0",          # Versión
    "depends": ["base"],       # Dependencias
    "author": "Deborah Iori",  # Autor
    "summary": "Manage todo lists and tasks",# Descripción corta
    "data": [
        "security/ir.model.access.csv",
        "views/todo_list_views.xml",
        "views/todo_item_views.xml",
        'views/res_users_views.xml',
    ],                # XML, CSV...
    "assets": {
        "web.assets_backend": [
            "todo_management/static/src/dashboard/**/*",
        ],
    },
    "installable": True,       # Se puede instalar
    "application": True,       # Aparece como aplicación
}