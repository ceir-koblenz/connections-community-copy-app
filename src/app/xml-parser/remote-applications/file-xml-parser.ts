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
        var tParsedObj:any = parsedObj;
        if (tParsedObj && parsedObj.entry !== undefined) {
            tParsedObj = parsedObj.entry;
        }
        if (tParsedObj) {
            entity.uUid = tParsedObj["td:uuid"];
            entity.title = tParsedObj.title["#text"];
            entity.label = tParsedObj["td:label"];
            entity.summary = tParsedObj.summary["#text"];
            entity.authorUuid = tParsedObj.author["snx:userid"];
            entity.isInFolder = tParsedObj["td:isFiledInFolder"];
            var link_list = tParsedObj.link;
            link_list.forEach(link => {
                // file download link
                if (link["@_rel"] === "enclosure") {
                    entity.fileUrl = link["@_href"];
                }
            });
        }
    }
}