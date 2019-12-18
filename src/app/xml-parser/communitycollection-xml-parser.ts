import { CommunityCollection } from '../models/community-collection.model';
import { Community } from '../models/community.model';
import { CommunityXmlParser } from './community-xml-parser';
import { EntityFeedXmlParserAbstract } from './entity-feed-xml-parser-abstract';

/**
 * XML-Parser für das Parsen eines Community-Feeds.
 *
 * @export
 * @class CommunityCollectionXmlParser
 * @extends {EntityFeedXmlParserAbstract<CommunityCollection>}
 */
export class CommunityCollectionXmlParser extends EntityFeedXmlParserAbstract<CommunityCollection>{
    fillFromObject(entity: CommunityCollection, parsedObj: any): void {
        var commParser = new CommunityXmlParser();

        parsedObj.feed.entry.forEach(entry => {
            var commEntity = new Community();
            commParser.fillFromObject(commEntity, { entry: entry });

            entity.communities.push(commEntity);
        });
    }
}