/** @odoo-module **/

import { registry } from "@web/core/registry";

registry.category("web_tour.tours").add("estate_importable_tour", {
    url: "/web",
    sequence: 170,
    steps: () => [{
        trigger: '[data-menu-xmlid="estate_importable.menu_real_estate_property"]',
        content: "Here you can manage your properties!",
        position: "bottom",
    }],
});