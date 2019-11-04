import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { MemberCollection } from '../models/member-collection.model';
import { MemberXmlParser } from './member-xml';
import { Member } from '../models/member.model';

/**
 * XML-Parser für das Parsen einer CommunityCollection.
 *
 * @export
 * @class CommunityCollectionXmlParser
 * @extends {EntityXmlParserAbstract<CommunityCollection>}
 */
export class MemberCollectionXmlParser extends EntityXmlParserAbstract<MemberCollection>{
    fillFromObject(entity: MemberCollection, parsedObj: any): void {
        var memberParser = new MemberXmlParser();
        if (parsedObj.feed.entry.length !== undefined) {
            parsedObj.feed.entry.forEach(entry => {
                var memEntity = new Member();
                memberParser.fillFromObject(memEntity, { entry: entry });

                entity.membercollection.push(memEntity);
            });
        } else {
            var memEntity = new Member();
            memberParser.fillFromObject(memEntity, { entry: (parsedObj.feed.entry) });

            entity.membercollection.push(memEntity);
        }
    }
}