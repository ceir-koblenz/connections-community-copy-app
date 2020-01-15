import { EntityXmlParserAbstract } from '../entity-xml-parser-abstract';
import { FileCollection } from 'src/app/models/remote-applications/file-collection.model';
import { FileXmlParser } from './file-xml-parser';
import { File } from 'src/app/models/remote-applications/file.model';
import { FolderCollection } from 'src/app/models/remote-applications/folder-collection.model';
import { FolderXmlParser } from './folder-xml-parser';
import { Folder } from 'src/app/models/remote-applications/folder.model';

/**
 * XML-Parser für das Parsen der File Collection einer Community.
 *
 * @export
 * @class FolderCollectionXmlParser
 * @extends {EntityXmlParserAbstract<any>}
 */
export class FolderCollectionXmlParser extends EntityXmlParserAbstract<any>{

    fillFromObject(entity: FolderCollection, parsedObj: any): void {
        var entries = parsedObj.feed.entry;
        var folderParser = new FolderXmlParser();
        if (Array.isArray(entries)) {
            entries.forEach(entry => {
                var folder = new Folder();
                folderParser.fillFromObject(folder, entry);
                entity.folders.push(folder);
            });
        } else {
            // Aufgrund der pagination kann es vorkommen, dass entries kein array sondern ein object ist.
            var folder = new Folder();
            folderParser.fillFromObject(folder, entries);
            entity.folders.push(folder);
        }
    }

    /**
     * Gibt die URL zur nächsten Seite des Feeds zurück, falls vorhanden. Sonst null.
     * @param parsedObj 
     */
    getNextPageUrl(originUrl: any, xmlString: string): URL {
        var parsedObj = super.parse(xmlString); // todo das bedeutet, dass für Collections der Xml-Baum zweimal geparst wird... fürs Fill und fürs getNextPage

        var result: URL = null;
        parsedObj.feed.link.forEach(link => {
            if (result === null && link["@_rel"] == "next") {
                result = new URL(link["@_href"]);
                // Quick & dirty ...                
                if (result.search == "?&amp;sI=11") {
                    result.search = "?page=2";
                } else {
                    var pageNumber = parseInt(result.search.charAt(result.search.length - 1));
                    result.search = "?page=" + pageNumber;
                }
                result.href = originUrl + result.search;
            }
        });

        return result;
    }
}