import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { CommunityCollection } from '../models/community-collection.model';
import { EntityLink } from '../common/entity-link';
import { Community } from '../models/community.model';

/**
 * XML-Parser für das Parsen einer Community.
 *
 * @export
 * @class CommunityCollectionXmlParser
 * @extends {EntityXmlParserAbstract<Community>}
 */
export class CommunityXmlParser extends EntityXmlParserAbstract<Community>{
    fillFromObject(entity: Community, parsedObj: any): void {
        entity.id = parsedObj.entry["snx:communityUuid"];
        entity.title = parsedObj.entry.title["#text"];
        var link_list = parsedObj.entry.link;
        link_list.forEach(link => {
            // Community logo link
            if (link["@_rel"] == "http://www.ibm.com/xmlns/prod/sn/logo") {
                entity.logo.url = link["@_href"];
            }
        });
    }
}