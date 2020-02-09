import { EntityXmlParserAbstract } from '../entity-xml-parser-abstract';
import { ForumTopic } from 'src/app/models/remote-applications/forumtopic.model';

/**
 * XML-Parser für das Parsen der Remote Apps einer Community.
 *
 * @export
 * @class export class ForumXmlParser extends EntityXmlParserAbstract<any>{

 * @extends {EntityXmlParserAbstract<any>}
 */
export class ForumTopicXmlParser extends EntityXmlParserAbstract<any>{
    fillFromObject(entity: ForumTopic, parsedObj: any): void {
        var tParsedObj: any = parsedObj;
        if (tParsedObj && parsedObj.entry !== undefined) {
            tParsedObj = parsedObj.entry;
        }
        entity.title = tParsedObj.title["#text"];
        entity.content = tParsedObj.content["#text"];

    }
}
