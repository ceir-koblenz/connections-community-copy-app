import { EntityXmlParserAbstract } from '../entity-xml-parser-abstract';
import { EntityLink } from '../../common/entity-link';
import { File } from 'src/app/models/remote-applications/file.model';
import { Folder } from 'src/app/models/remote-applications/folder.model';

/**
 * XML-Parser für das Parsen von einem Folder einer Community.
 *
 * @export
 * @class export class FolderXmlParser extends EntityXmlParserAbstract<any>{

 * @extends {EntityXmlParserAbstract<any>}
 */
export class FolderXmlParser extends EntityXmlParserAbstract<any>{
    fillFromObject(entity: Folder, parsedObj: any): void {        
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
            var link_list = tParsedObj.link;
            link_list.forEach(link => {
                // subfolder link
                if (link["@_rel"] === "files") {
                    entity.feed_link = link["@_href"];
                }
            });
        }
    }
}