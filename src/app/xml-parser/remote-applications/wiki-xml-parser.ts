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
        entity.uUid = parsedObj["td:uuid"];
        entity.title = parsedObj.title["#text"];
        entity.label = parsedObj["td:label"];  
        entity.summary = parsedObj.summary;
        entity.authorUuid = parsedObj.author["snx:userid"];      
        entity.contentUrl = new EntityLink<any>(parsedObj.content["@_src"], "content");
    }
}