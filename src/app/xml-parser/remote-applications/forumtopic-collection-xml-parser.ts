import { ForumTopicCollection } from 'src/app/models/remote-applications/forumtopic-collection.model';
import { ForumTopicXmlParser } from './forumtopic-xml-parser';
import { ForumTopic } from 'src/app/models/remote-applications/forumtopic.model';
import { EntityFeedXmlParserAbstract } from '../entity-feed-xml-parser-abstract';

/**
 * XML-Parser für das Parsen der Forum Collection einer Community.
 *
 * @export
 * @class ForumCollectionXmlParser
 * @extends {EntityFeedXmlParserAbstract<any>}
 */
export class ForumTopicCollectionXmlParser extends EntityFeedXmlParserAbstract<ForumTopicCollection> {

    fillFromObject(entity: ForumTopicCollection, parsedObj: any): void {
        var entries = parsedObj.feed.entry;
        entity.id = parsedObj.feed['td:uuid'];
        var topicParser = new ForumTopicXmlParser();
        if (Array.isArray(entries)) {
            entries.forEach(entry => {
                var topic = new ForumTopic();
                topicParser.fillFromObject(topic, entry);
                entity.topics.push(topic);
            });
        } else if (entries) {
            // Aufgrund der pagination kann es vorkommen, dass entries kein array sondern ein object ist.
            var topic = new ForumTopic();
            topicParser.fillFromObject(topic, entries);
            entity.topics.push(topic);
        }
    }

}

