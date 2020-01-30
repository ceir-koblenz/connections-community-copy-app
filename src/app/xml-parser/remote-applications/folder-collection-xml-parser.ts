import { FolderCollection } from 'src/app/models/remote-applications/folder-collection.model';
import { FolderXmlParser } from './folder-xml-parser';
import { Folder } from 'src/app/models/remote-applications/folder.model';
import { EntityFeedXmlParserAbstract } from '../entity-feed-xml-parser-abstract';

/**
 * XML-Parser für das Parsen der Folder Collection einer Community.
 *
 * @export
 * @class FolderCollectionXmlParser
 * @extends {EntityXmlParserAbstract<FolderCollection>}
 */
export class FolderCollectionXmlParser extends EntityFeedXmlParserAbstract<FolderCollection>{
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
}