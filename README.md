# Odoo 17 Learning Project

A collection of Odoo modules and customizations developed during my internship at **Pulsar Technologies**, as well as through independent learning and practice with the Odoo framework.

The project includes exercises based on the official Odoo tutorials, together with additional modules and personal modifications developed to explore Odoo's backend and web development capabilities.

## Modules

The custom addons are located in `odoo-addons/`.

| Module | Description |
|---|---|
| `estate` | Real estate management, including properties, views, and website functionality. |
| `estate_account` | Integration between the real estate application and accounting functionality. |
| `estate_importable` | An importable version of the estate module. |
| `todo_management` | Task management module featuring a custom OWL dashboard component connected to backend task data, demonstrating integration between Odoo's Python models and interactive frontend components. |
| `awesome_dashboard` | Dashboard development and data presentation. |
| `awesome_owl` | Exercises involving OWL components and the Odoo web framework. |
| `awesome_kanban` | Kanban interface development. |
| `awesome_gallery` | Gallery interface exercises. |
| `awesome_clicker` | Interactive web interface exercises. |

Some modules follow the official Odoo tutorials and have been adapted or extended during my learning process.

## Local Development

The project uses Docker Compose to run Odoo and PostgreSQL locally.

### Prerequisites

- Docker
- Docker Compose

### Start the environment

Clone the repository and enter the project directory:

```bash
git clone https://github.com/Deborah9494/odoo-learning-project.git
cd odoo-learning-project
```

Start the services:

```bash
docker compose up -d
```

Open Odoo in your browser:

http://localhost:8069

The custom addons are mounted from `odoo-addons/` into the Odoo container.

**Note:** The Docker Compose configuration is intended for local development. Review the database credentials and configuration before using this setup in any shared or production environment.

## Context

This repository brings together work from my internship at Pulsar Technologies and my continued learning with Odoo 17. It documents my progress in Python development, ERP customization, and web application development.

The Git history reflects the development process during the internship and subsequent personal updates.

## Status

This is a learning and development project that evolves as I explore new Odoo features and development techniques.