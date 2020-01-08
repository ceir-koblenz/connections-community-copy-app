import { EntityXmlParserAbstract } from '../entity-xml-parser-abstract';
import { Blog } from 'src/app/models/remote-applications/blog.model';

/**
 * XML-Parser für das Parsen der Remote Apps einer Community.
 *
 * @export
 * @class export class BlogEntryXmlParser extends EntityXmlParserAbstract<any>{

 * @extends {EntityXmlParserAbstract<any>}
 */
export class BlogXmlParser extends EntityXmlParserAbstract<any>{
    fillFromObject(entity: Blog, parsedObj: any): void {
        entity.title = parsedObj.title["#text"];
        entity.summary = parsedObj.summary["#text"];
        entity.content = parsedObj.content["#text"];
    }
}