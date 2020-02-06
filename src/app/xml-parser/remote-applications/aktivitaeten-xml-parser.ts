import { EntityXmlParserAbstract } from '../entity-xml-parser-abstract';
import { EntityLink } from '../../common/entity-link';
import { Aktivitaet } from 'src/app/models/remote-applications/aktivitaeten.model';

/**
 * XML-Parser für das Parsen der Remote Apps einer Community.
 *
 * @export
 * @class export class WikiXmlParser extends EntityXmlParserAbstract<any>{

 * @extends {EntityXmlParserAbstract<any>}
 */
export class AktivitaetXmlParser extends EntityXmlParserAbstract<any>{
    fillFromObject(entity: Aktivitaet, parsedObj: any): void {
        entity.idUnchanged = parsedObj.entry.id.toLocaleString();
        entity.uUid = parsedObj.entry["snx:activity"];
        entity.title = parsedObj.entry.title["#text"];
        entity.authorUuid = parsedObj.entry.author["snx:userid"]; 
        entity.duedate = parsedObj.entry["snx:duedate"] ;
        entity.published = parsedObj.entry.published;
        entity.updated = parsedObj.entry.updated; 
        entity.ziel = parsedObj.entry.content["#text"]; 
        entity.shouldCopy = false;
    }
}