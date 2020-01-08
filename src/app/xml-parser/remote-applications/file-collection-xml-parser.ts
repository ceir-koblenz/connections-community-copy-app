import { EntityXmlParserAbstract } from '../entity-xml-parser-abstract';
import { FileCollection } from 'src/app/models/remote-applications/file-collection.model';
import { FileXmlParser } from './file-xml-parser';
import { File } from 'src/app/models/remote-applications/file.model';

/**
 * XML-Parser für das Parsen der File Collection einer Community.
 *
 * @export
 * @class FileCollectionXmlParser
 * @extends {EntityXmlParserAbstract<any>}
 */
export class FileCollectionXmlParser extends EntityXmlParserAbstract<any>{

    fillFromObject(entity: FileCollection, parsedObj: any): void {
        var entries:any;
        if (parsedObj.feed !== undefined) {
            entries = parsedObj.feed.entry;
        } else if (parsedObj.entry !== undefined) {
            entries = parsedObj.entry;
        }
        var fileParser = new FileXmlParser();
        if (Array.isArray(entries)) {
            entries.forEach(entry => {
                var file = new File();
                fileParser.fillFromObject(file, entry);
                entity.files.push(file);
            });
        } else {
            // Aufgrund der pagination kann es vorkommen, dass entries kein array sondern ein object ist.
            var file = new File();
            fileParser.fillFromObject(file, entries);
            entity.files.push(file);
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