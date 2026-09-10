/** @odoo-module */

export class GalleryArchParser {
    parse(xmlDoc) {
        const imageField = xmlDoc.getAttribute("image_field");
        // how many records to load
        const limit = xmlDoc.getAttribute("limit") || 80;
        return {
            imageField,
            limit,
        };
    }
}