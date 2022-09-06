"use strict";

import powerbi from "powerbi-visuals-api";
import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstanceEnumeration = powerbi.VisualObjectInstanceEnumeration;


export class Settings {
  public duration: number = 5000;
}

export class VisualSettings extends DataViewObjectsParser {
  public configuracion: Settings = new Settings();
}
