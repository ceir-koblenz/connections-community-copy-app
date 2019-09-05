import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { CommunityCollection } from '../models/community-collection.model';
import { EntityLink } from '../common/entity-link';
import { Community } from '../models/community.model';
import { CommunityXmlParser } from './community-xml-parser';

/**
 * XML-Parser für das Parsen eines Community-Feeds.
 *
 * @export
 * @class CommunityCollectionXmlParser
 * @extends {EntityXmlParserAbstract<CommunityCollection>}
 */
export class CommunityCollectionXmlParser extends EntityXmlParserAbstract<CommunityCollection>{
    fillFromObject(entity: CommunityCollection, parsedObj: any): void {
        var commParser = new CommunityXmlParser();

        parsedObj.feed.entry.forEach(entry => {
            var commEntity = new Community();
            commParser.fillFromObject(commEntity, {entry: entry});

            entity.communities.push(commEntity);
        });
    }
}