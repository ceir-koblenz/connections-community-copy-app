import { EntityXmlParserAbstract } from '../entity-xml-parser-abstract';
import { EntityLink } from '../../common/entity-link';
import { Forum } from 'src/app/models/remote-applications/forum.model';

/**
 * XML-Parser für das Parsen der Remote Apps einer Community.
 *
 * @export
 * @class export class ForumXmlParser extends EntityXmlParserAbstract<any>{

 * @extends {EntityXmlParserAbstract<any>}
 */
export class ForumXmlParser extends EntityXmlParserAbstract<any>{
    fillFromObject(entity: Forum, parsedObj: any): void {
        entity.title = parsedObj.title["#text"];
        entity.content = parsedObj.content["#text"];
    }
}
