import { EntityXmlParserAbstract } from '../entity-xml-parser-abstract';
import { EntityLink } from '../../common/entity-link';
import { Blog } from 'src/app/models/remote-applications/blog.model';
import { BlogEntry } from 'src/app/models/remote-applications/blog-entry.model';

/**
 * XML-Parser für das Parsen der Remote Apps einer Community.
 *
 * @export
 * @class export class BlogEntryXmlParser extends EntityXmlParserAbstract<any>{

 * @extends {EntityXmlParserAbstract<any>}
 */
export class BlogEntryXmlParser extends EntityXmlParserAbstract<any>{
    fillFromObject(entity: BlogEntry, parsedObj: any): void {
        entity.title = parsedObj.title["#text"];
        entity.summary = parsedObj.summary["#text"];
        entity.content = parsedObj.summary["#text"];

    }
}