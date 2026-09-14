/** @odoo-module */
import { visitXML } from "@web/core/utils/xml";

export class GalleryArchParser {
    parse(xmlDoc) {
        const imageField = xmlDoc.getAttribute("image_field");
        // how many records to load
        const limit = xmlDoc.getAttribute("limit") || 20;

        const fieldsForTooltip = [];
        let tooltipTemplate = undefined;
        visitXML(xmlDoc, (node) => {
            if (node.tagName === "field") {
                fieldsForTooltip.push(node.getAttribute("name"));
            }
            if (node.tagName === "tooltip-template") {
                tooltipTemplate = node;
            }
        })

        return {
            imageField,
            limit, // if not present in view, is optional
            fieldsForTooltip,
            tooltipTemplate,
        };
    }
}