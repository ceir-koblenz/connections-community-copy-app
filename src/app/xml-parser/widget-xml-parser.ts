import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { Widget } from '../models/widget.model';
import { EntityLink } from '../common/entity-link';

/**
 * XML-Parser für das Parsen der Widgets einer Community.
 *
 * @export
 * @class WidgetXmlParser
 * @extends {EntityXmlParserAbstract<any>}
 */
export class WidgetXmlParser extends EntityXmlParserAbstract<any>{
    fillFromObject(entity: Widget, parsedObj: any): void {
        entity.id = parsedObj.id;
        entity.title = parsedObj.title["#text"];
        var link_list = parsedObj.link;
        var category = parsedObj.title["#text"];
        link_list.forEach(link => {
            // Remote app content link
            if (link["@_rel"] == "edit") {
                entity.link = new EntityLink<Widget>(link["@_href"], category);
            }
        });
    }
}