import { EntityXmlParserAbstract } from '../entity-xml-parser-abstract';
import { EntityLink } from '../../common/entity-link';
import { Wiki } from 'src/app/models/remote-applications/wiki.model';

/**
 * XML-Parser für das Parsen der Remote Apps einer Community.
 *
 * @export
 * @class export class WikiXmlParser extends EntityXmlParserAbstract<any>{

 * @extends {EntityXmlParserAbstract<any>}
 */
export class WikiXmlParser extends EntityXmlParserAbstract<any>{
    fillFromObject(entity: Wiki, parsedObj: any): void {
        var tParsedObj:any = parsedObj;
        if (tParsedObj && parsedObj.entry !== undefined) {
            tParsedObj = parsedObj.entry;
        }
        entity.uUid = tParsedObj["td:uuid"];
        entity.title = tParsedObj.title["#text"];
        entity.label = tParsedObj["td:label"];  
        entity.summary = tParsedObj.summary["#text"];
        entity.authorUuid = tParsedObj.author["snx:userid"];      
        entity.contentUrl = new EntityLink<any>(tParsedObj.content["@_src"], "content");
    }
}