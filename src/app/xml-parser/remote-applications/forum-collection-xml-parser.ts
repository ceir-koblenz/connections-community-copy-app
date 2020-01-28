import { ForumCollection } from 'src/app/models/remote-applications/forum-collection.model';
import { ForumXmlParser } from './forum-xml-parser';
import { Forum } from 'src/app/models/remote-applications/forum.model';
import { EntityFeedXmlParserAbstract } from '../entity-feed-xml-parser-abstract';

/**
 * XML-Parser für das Parsen der Forum Collection einer Community.
 *
 * @export
 * @class ForumCollectionXmlParser
 * @extends {EntityFeedXmlParserAbstract<any>}
 */
export class ForumCollectionXmlParser extends EntityFeedXmlParserAbstract<ForumCollection>{
    fillFromObject(entity: ForumCollection, parsedObj: any): void {
        var entries = parsedObj.feed.entry;
        entity.id = parsedObj.feed['td:uuid'];
        var forumParser = new ForumXmlParser();
        if (Array.isArray(entries)) {
            entries.forEach(entry => {
                var forum = new Forum();
                forumParser.fillFromObject(forum, entry);
                entity.foren.push(forum);
            });
        } else {
            // Aufgrund der pagination kann es vorkommen, dass entries kein array sondern ein object ist.
            var forum = new Forum();
            forumParser.fillFromObject(forum, entries);
            entity.foren.push(forum);
        }
    }
}

