import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { CommunityCollection } from '../models/community-collection.model';
import { EntityLink } from './entity-link';
import { Community } from '../models/community.model';

/**
 * XML-Parser für das Parsen eines Community-Feeds.
 *
 * @export
 * @class CommunityCollectionXmlParser
 * @extends {EntityXmlParserAbstract<CommunityCollection>}
 */
export class CommunityCollectionXmlParser extends EntityXmlParserAbstract<CommunityCollection>{
    fillFromXml(entity: CommunityCollection, xmlString: string): void {
        var json = super.parse(xmlString);
        json.feed.entry.forEach(entry => {
            var name = entry.title["#text"]
            var selfLink = entry.link.find(link => {
                return link["@_rel"] === "self"
            })

            var commLink = new EntityLink<Community>(new URL(selfLink["@_href"]), name);
            entity.communityLinks.push(commLink);
        });
    }
}