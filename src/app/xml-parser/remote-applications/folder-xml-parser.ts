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
        if (parsedObj) {
            entity.uUid = parsedObj["td:uuid"];
            entity.title = parsedObj.title["#text"];
            entity.label = parsedObj["td:label"];
            entity.authorUuid = parsedObj.author["snx:userid"];
            var link_list = parsedObj.link;
            link_list.forEach(link => {
                // subfolder link
                if (link["@_rel"] === "files") {
                    entity.feed_link = link["@_href"];
                }
            });
        }
    }
}