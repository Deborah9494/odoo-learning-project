/** @odoo-module */
import { Component, onWillStart, onWillUpdateProps, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { standardViewProps } from "@web/views/standard_view_props";
import { Layout } from "@web/search/layout";
// import { KeepLast } from "@web/core/utils/concurrency";
// import { GalleryModel } from "./gallery_model"; 
// import { GalleryRenderer } from "./gallery_renderer";

export class GalleryController extends Component {
    static template = "awesome_gallery.GalleryController";
    static props = {
        ...standardViewProps, // accepts all the standard props that an Odoo view controller normally receives
        archInfo: Object,
        Model: Function,
        Renderer: Function,
    };
    static components = {
        Layout,
        // GalleryRenderer
    };

    setup() {
        // to communicate with Odoo's backend models
        this.orm = useService("orm");
        // create reactive storage for the images
        // this.images = useState({
        //     data: [] 
        // });
        // this.keeplast = new KeepLast();
        this.model = useState(
            // new GalleryModel(
            new this.props.Model(
                this.orm,
                this.props.resModel,
                this.props.archInfo,
            )
        );

        // When the Gallery is about to start, load the records
        onWillStart(async () => {
            // const { records } = await this.loadImages(this.props.domain);
            // this.images.data = records;
            await this.model.load(this.props.domain);
        });

        // If the domain changes
        onWillUpdateProps(async (nextProps) => {
            if (JSON.stringify(nextProps.domain) !== JSON.stringify(this.props.domain)) {
                // const { records } = await this.loadImages(nextProps.domain);
                // this.images.data = records;
                await this.model.load(nextProps.domain);
            }
        });
    }

    // performs a webSearchRead call from the orm service to fetch records corresponding to the domain, and uses imageField received in props
    /*
    loadImages(domain) { 
        // keeplast solves the concurrency problem
        // if several requests are happening, only use the newest one's result.
        return this.keeplast.add(
            this.orm.webSearchRead(this.props.resModel, domain, {
                limit: this.props.archInfo.limit,
                specification: {
                    [this.props.archInfo.imageField]: {},
                },
                context: {
                    // to receive the size of the image field, if not included, will receive the image field encoded in base 64
                    bin_size: true, 
                }
            })
        );
    }
    */

}
