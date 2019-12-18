import { WidgetCollection } from '../models/widget-collection.model'
import { Widget } from '../models/widget.model';
import { WidgetXmlParser } from './widget-xml-parser'
import { EntityFeedXmlParserAbstract } from './entity-feed-xml-parser-abstract';

/**
 * XML-Parser für das Parsen der Widget Collection einer Community.
 *
 * @export
 * @class WidgetCollectionXmlParser
 * @extends {EntityFeedXmlParserAbstract<WidgetCollection>}
 */
export class WidgetCollectionXmlParser extends EntityFeedXmlParserAbstract<WidgetCollection>{
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