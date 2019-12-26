import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { CommunityCollection } from '../models/community-collection.model';
import { EntityLink } from '../common/entity-link';
import { Community } from '../models/community.model';
import { User  } from '../models/user.model';

/**
 * XML-Parser für das Parsen des aktuellen Users der Anwendung.
 *
 * @export
 * @class userXmlParser
 * @extends {EntityXmlParserAbstract<Member>}
 */
export class userXmlParser extends EntityXmlParserAbstract<User>{
    fillFromObject(entity: User, parsedObj: any): void {
        entity.UUid = parsedObj.service.workspace.collection['snx:userid'];
    }
}