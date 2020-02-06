import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { Widget } from '../models/widget.model';

/**
 * XML-Parser für das Parsen eines Community-Widgets.
 *
 * @export
 * @class WidgetXmlParser
 * @extends {EntityXmlParserAbstract<Widget>}
 */
export class WidgetXmlParser extends EntityXmlParserAbstract<Widget>{
    fillFromObject(entity: Widget, parsedObj: any): void {
        entity.id = parsedObj.id
        entity.title = parsedObj.title["#text"]
        entity.widgetDefId = parsedObj["snx:widgetDefId"]
    }
}