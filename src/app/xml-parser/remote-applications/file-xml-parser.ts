import { EntityXmlParserAbstract } from '../entity-xml-parser-abstract';
import { EntityLink } from '../../common/entity-link';
import { File } from 'src/app/models/remote-applications/file.model';

/**
 * XML-Parser für das Parsen von einem File einer Community.
 *
 * @export
 * @class export class FileXmlParser extends EntityXmlParserAbstract<any>{

 * @extends {EntityXmlParserAbstract<any>}
 */
export class FileXmlParser extends EntityXmlParserAbstract<any>{
    fillFromObject(entity: File, parsedObj: any): void {
        entity.uUid = parsedObj["td:uuid"];
        entity.title = parsedObj.title["#text"];
        entity.label = parsedObj["td:label"];
        entity.summary = parsedObj.summary["#text"];
        entity.authorUuid = parsedObj.author["snx:userid"];
        var link_list = parsedObj.link;
        link_list.forEach(link => {
            // file download link
            if (link["@_rel"] === "enclosure") {
                entity.fileUrl = link["@_href"];
            }
        });
    }
}