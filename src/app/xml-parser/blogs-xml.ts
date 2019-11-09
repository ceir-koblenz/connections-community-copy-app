

import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { CommunityCollection } from '../models/community-collection.model';
import { EntityLink } from '../common/entity-link';
import { Community } from '../models/community.model';
import { Blogs  } from '../models/blogs.model';

/**
 * XML-Parser für das Parsen der Member einer Community.
 *
 * @export
 * @class BlogsXmlParser
 * @extends {EntityXmlParserAbstract<Member>}
 */


export class BlogsXmlParser extends EntityXmlParserAbstract<Blogs>{
    fillFromObject(entity: Blogs, parsedObj: any): void {
        //TODO change attributes
        entity.email = parsedObj.entry.contributor.email;
        entity.UUid = parsedObj.entry.contributor["snx:userid"];
        entity.name = parsedObj.entry.contributor.name;
        entity.role = parsedObj.entry["snx:role"];
        entity.UUid = entity.UUid["#text"];
        entity.role = entity.role["#text"];
        entity.Uebernehmen = false;
   
    }
}