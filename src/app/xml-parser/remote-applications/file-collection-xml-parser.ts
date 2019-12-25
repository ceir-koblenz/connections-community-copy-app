import { FileCollection } from 'src/app/models/remote-applications/file-collection.model';
import { FileXmlParser } from './file-xml-parser';
import { File } from 'src/app/models/remote-applications/file.model';
import { EntityFeedXmlParserAbstract } from '../entity-feed-xml-parser-abstract';

/**
 * XML-Parser für das Parsen der File Collection einer Community.
 *
 * @export
 * @class FileCollectionXmlParser
 * @extends {EntityFeedXmlParserAbstract<any>}
 */
export class FileCollectionXmlParser extends EntityFeedXmlParserAbstract<any>{

    fillFromObject(entity: FileCollection, parsedObj: any): void {
        var entries = parsedObj.feed.entry;
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
}