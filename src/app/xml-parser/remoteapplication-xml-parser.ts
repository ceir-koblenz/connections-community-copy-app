import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { RemoteApplication } from '../models/remoteapplication.model';
import { EntityLink } from '../common/entity-link';

/**
 * XML-Parser für das Parsen der Remote Apps einer Community.
 *
 * @export
 * @class RemoteApplicationXmlParser
 * @extends {EntityXmlParserAbstract<any>}
 */
export class RemoteApplicationXmlParser extends EntityXmlParserAbstract<any>{
    fillFromObject(entity: RemoteApplication, parsedObj: any): void {
        entity.id = parsedObj.id;
        entity.title = parsedObj.title["#text"];
        var link_list = parsedObj.link;
        var category = parsedObj.category["@_term"];
        link_list.forEach(link => {
            // Community logo link
            if (link["@_rel"] == "http://www.ibm.com/xmlns/prod/sn/remote-application/feed") {
                entity.link = new EntityLink<RemoteApplication>(link["@_href"], category);
            }
        });
    }
}