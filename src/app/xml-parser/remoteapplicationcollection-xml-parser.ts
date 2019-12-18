import { RemoteApplicationCollection } from '../models/remoteapplication-collection.model'
import { RemoteApplication } from '../models/remoteapplication.model';
import { RemoteApplicationXmlParser } from './remoteapplication-xml-parser'
import { EntityFeedXmlParserAbstract } from './entity-feed-xml-parser-abstract';

/**
 * XML-Parser für das Parsen der Remote Apps Collection einer Community.
 *
 * @export
 * @class RemoteApplicationCollectionXmlParser
 * @extends {EntityFeedXmlParserAbstract<RemoteApplicationCollection>}
 */
export class RemoteApplicationCollectionXmlParser extends EntityFeedXmlParserAbstract<RemoteApplicationCollection>{
    fillFromObject(entity: RemoteApplicationCollection, parsedObj: any): void {
        var entries = parsedObj.feed.entry;
        var remoteAppParser = new RemoteApplicationXmlParser();

        const _parseAndAddEntry = (x) => {
            var remoteApplication = new RemoteApplication();
            remoteAppParser.fillFromObject(remoteApplication, x);
            entity.remoteApplications.push(remoteApplication);
        }

        // Unterscheidung, weil das JSON unterschiedlich ausfällt, wenn es mehrere RemoteApps gibt
        if (entries.length === undefined) {
            _parseAndAddEntry(entries);
        } else {
            entries.forEach(entry => {
                _parseAndAddEntry(entry);
            });
        }
    }
}