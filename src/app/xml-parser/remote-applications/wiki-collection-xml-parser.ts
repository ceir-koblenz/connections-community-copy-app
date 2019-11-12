import { EntityXmlParserAbstract } from '../entity-xml-parser-abstract';
import { WikiCollection } from 'src/app/models/remote-applications/wiki-collection.model';
import { WikiXmlParser } from './wiki-xml-parser';
import { Wiki } from 'src/app/models/remote-applications/wiki.model';

/**
 * XML-Parser für das Parsen der Remote Apps Collection einer Community.
 *
 * @export
 * @class RemoteApplicationCollectionXmlParser
 * @extends {EntityXmlParserAbstract<any>}
 */
export class WikiCollectionXmlParser extends EntityXmlParserAbstract<any>{
    fillFromObject(entity: WikiCollection, parsedObj: any): void {
        var entries = parsedObj.feed.entry;
        var wikiParser = new WikiXmlParser();
        entries.forEach(entry => {
            var wiki = new Wiki();
            wikiParser.fillFromObject(wiki, entry);
            entity.wikis.push(wiki);
        });
    }
}