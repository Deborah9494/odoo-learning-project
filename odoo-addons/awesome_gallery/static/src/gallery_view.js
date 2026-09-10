/** @odoo-module */
import { registry } from "@web/core/registry";
import { GalleryController } from "./gallery_controller";
import { GalleryArchParser } from "./gallery_arch_parser";
import { GalleryModel } from "./gallery_model";
import { GalleryRenderer } from "./gallery_renderer";

// configuration/information for Odoo's view system
export const galleryView = {
      type: "gallery",
      display_name: "Gallery",
      icon: "fa fa-picture-o",
      multiRecord: true,
      Controller: GalleryController, // actual Owl component
      ArchParser: GalleryArchParser,
      Model: GalleryModel,
      Renderer: GalleryRenderer,
      
      props(genericProps, view) {
            const { ArchParser } = view;
            const { arch } = genericProps;
            // Create a GalleryArchParser and ask it to parse the arch.
            const archInfo = new ArchParser().parse(arch);

            return {
                  ...genericProps,
                  Model: view.Model,
                  Renderer: view.Renderer,
                  archInfo,
            };
      },
};

registry.category("views").add("gallery", galleryView);
