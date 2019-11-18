import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { WidgetCollection } from '../models/widget-collection.model'
import { Widget } from '../models/widget.model';
import { WidgetXmlParser } from './widget-xml-parser'

/**
 * XML-Parser für das Parsen der Widget Collection einer Community.
 *
 * @export
 * @class WidgetCollectionXmlParser
 * @extends {EntityXmlParserAbstract<any>}
 */
export class WidgetCollectionXmlParser extends EntityXmlParserAbstract<any>{
    fillFromObject(entity: WidgetCollection, parsedObj: any): void {
        var entries = parsedObj.feed.entry;
        var widgetsParser = new WidgetXmlParser();
        entries.forEach(entry => {
            var widget = new Widget();
            widgetsParser.fillFromObject(widget, entry);
            entity.Widgets.push(widget);
        });
    }
}