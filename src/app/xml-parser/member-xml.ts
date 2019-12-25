import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { CommunityCollection } from '../models/community-collection.model';
import { EntityLink } from '../common/entity-link';
import { Community } from '../models/community.model';
import { Member  } from '../models/member.model';

/**
 * XML-Parser für das Parsen der Member einer Community.
 *
 * @export
 * @class MembersXmlParser
 * @extends {EntityXmlParserAbstract<Member>}
 */
export class MemberXmlParser extends EntityXmlParserAbstract<Member>{
    fillFromObject(entity: Member, parsedObj: any): void {

        entity.email = parsedObj.entry.contributor.email;
        entity.UUid = parsedObj.entry.contributor["snx:userid"];
        entity.name = parsedObj.entry.contributor.name;
        entity.role = parsedObj.entry["snx:role"];
        entity.UUid = entity.UUid["#text"];
        entity.role = entity.role["#text"];
        entity.shouldCopy = false;
   
    }
}