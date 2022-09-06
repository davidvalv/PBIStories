import * as React from "react";
import * as ReactDOM from "react-dom";

import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;
import DataViewCategorical = powerbi.DataViewCategorical;

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;

import IViewport = powerbi.IViewport;
import VisualObjectInstance = powerbi.VisualObjectInstance;

import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;

import { ImageComponent, initialState } from "./image";
import { VisualSettings } from "./settings";
import { Data } from "./interfaces";
import "./../style/visual.less";

export class Visual implements IVisual {
    private settings: VisualSettings;
    private target: HTMLElement;
    private reactRoot: React.ComponentElement<any, any>;
    private viewport: IViewport;
    private host: IVisualHost;


    constructor(options: VisualConstructorOptions) {
        this.reactRoot = React.createElement(ImageComponent, {});
        this.target = options.element;
        this.host = options.host;

        ReactDOM.render(this.reactRoot, this.target);
    }

    public enumerateObjectInstances(
        options: EnumerateVisualObjectInstancesOptions
    ): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {


        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }

    public clear() {
        ImageComponent.update(initialState);
    }


    private dataExtraction(dataView: DataView) {
        const categoricalDataView: DataViewCategorical = dataView.categorical;

        const contentColumn = categoricalDataView.categories[0];
        const contentValues = contentColumn.values;

        const thumbnailColumn = categoricalDataView.categories[1];
        const thumbnailValues = thumbnailColumn.values;

        const headingColumn = categoricalDataView.categories[2];
        const headingValues = headingColumn.values;

        const subheadingColumn = categoricalDataView.categories[3];
        const subheadingValues = subheadingColumn.values;

        const data: Data[] = []

        for (let i = 0; i < contentValues.length; i++) {

            let content = contentValues[i].valueOf() as string;
            let thumbnail = thumbnailValues[i].valueOf() as string;
            let heading = headingValues[i].valueOf() as string;
            let subheading = subheadingValues[i].valueOf() as string;

            data.push(
                {
                    content: content,
                    thumbnail: thumbnail,
                    heading: heading,
                    subheading: subheading
                }
            )
        }
        return {
            data

        }
    }

    public update(options: VisualUpdateOptions) {
        if (options.dataViews && options.dataViews[0]) {
            const dataView: DataView = options.dataViews[0];
            this.settings = VisualSettings.parse(dataView) as VisualSettings;
            this.viewport = options.viewport;
            const { width, height } = this.viewport;
            const categoricalDataView: DataViewCategorical = dataView.categorical;
            const categoryColumn = categoricalDataView.categories[0];
            const categoryValues = categoryColumn.values;

            const data = this.dataExtraction(dataView).data;

            const configuracion = this.settings.configuracion;
            const size = Math.min(width, height);
            const duration = configuracion && configuracion.duration ? Math.max(500, configuracion.duration) : undefined


            ImageComponent.update({ data, height, width, size, duration });
        }
        else {
            this.clear();
        }

    }
}