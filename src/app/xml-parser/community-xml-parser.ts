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
        entity.summary = parsedObj.entry.summary["#text"]
        //entity.logoUrl = parsedObj.entry.logoUrl
        entity.datePublished = parsedObj.entry.published;
        entity.dateUpdated = parsedObj.entry.updated;
        
        //Debug
        //console.log(entity.logoUrl.toString());
        
        
        
    }
}