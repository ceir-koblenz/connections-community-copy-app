import { EntityXmlParserAbstract } from '../entity-xml-parser-abstract';
import { Forum } from 'src/app/models/remote-applications/forum.model';
import { ForumTopicCollection } from 'src/app/models/remote-applications/forumtopic-collection.model';

/**
 * XML-Parser für das Parsen der Remote Apps einer Community.
 *
 * @export
 * @class export class ForumXmlParser extends EntityXmlParserAbstract<any>{

 * @extends {EntityXmlParserAbstract<any>}
 */
export class ForumXmlParser extends EntityXmlParserAbstract<any>{
    fillFromObject(entity: Forum, parsedObj: any): void {
        var tParsedObj: any = parsedObj;
        if (tParsedObj && parsedObj.entry !== undefined) {
            tParsedObj = parsedObj.entry;
        }
        entity.title = tParsedObj.title["#text"];
        entity.content = tParsedObj.content["#text"];
        var arr: Array<string> = parsedObj.id.split(":");
        arr.splice(0, arr.length - 1);
        entity.id = arr.toLocaleString();

        // has to be loaded outside of the parser because the collection is not loaded in the xml of the forum.
        entity.topics = new ForumTopicCollection();

    }
}
