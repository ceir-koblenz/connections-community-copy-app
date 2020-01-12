import { EntityXmlParserAbstract } from '../entity-xml-parser-abstract';
import { WikiCollection } from 'src/app/models/remote-applications/wiki-collection.model';
import { WikiXmlParser } from './wiki-xml-parser';
import { Wiki } from 'src/app/models/remote-applications/wiki.model';
import { EntityFeedXmlParserAbstract } from '../entity-feed-xml-parser-abstract';

/**
 * XML-Parser für das Parsen der Remote Apps Collection einer Community.
 *
 * @export
 * @class RemoteApplicationCollectionXmlParser
 * @extends {EntityFeedXmlParserAbstract<WikiCollection>}
 */
export class WikiCollectionXmlParser extends EntityFeedXmlParserAbstract<WikiCollection>{

    fillFromObject(entity: WikiCollection, parsedObj: any): void {
        var entries = parsedObj.feed.entry;
        entity.id = parsedObj.feed['td:uuid'];
        var wikiParser = new WikiXmlParser();
        if (Array.isArray(entries)) {
            entries.forEach(entry => {
                var wiki = new Wiki();
                wikiParser.fillFromObject(wiki, entry);
                entity.wikis.push(wiki);
            });
        } else {
            // Aufgrund der pagination kann es vorkommen, dass entries kein array sondern ein object ist.
            var wiki = new Wiki();
            wikiParser.fillFromObject(wiki, entries);
            entity.wikis.push(wiki);
        }
    }
}