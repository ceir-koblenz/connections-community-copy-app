import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { RemoteApplicationCollection } from '../models/remoteapplication-collection.model'
import { RemoteApplication } from '../models/remoteapplication.model';
import { RemoteApplicationXmlParser } from './remoteapplication-xml-parser'

/**
 * XML-Parser für das Parsen der Remote Apps Collection einer Community.
 *
 * @export
 * @class RemoteApplicationCollectionXmlParser
 * @extends {EntityXmlParserAbstract<any>}
 */
export class RemoteApplicationCollectionXmlParser extends EntityXmlParserAbstract<any>{
    fillFromObject(entity: RemoteApplicationCollection, parsedObj: any): void {
        var entries = parsedObj.feed.entry;
        var remoteAppParser = new RemoteApplicationXmlParser();
        entries.forEach(entry => {
            var remoteApplication = new RemoteApplication();
            remoteAppParser.fillFromObject(remoteApplication, entry);
            entity.remoteApplications.push(remoteApplication);
        });
    }
}