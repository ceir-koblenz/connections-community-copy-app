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

        const _parseAndAddEntry = (x) => {
            var remoteApplication = new RemoteApplication();
            remoteAppParser.fillFromObject(remoteApplication, x);
            entity.remoteApplications.push(remoteApplication);
        }

        // Unterscheidung, weil das JSON unterschiedlich ausfällt, wenn es mehrere RemoteApps gibt
        if (entries.length === undefined) {
            _parseAndAddEntry(entries)
        } else {
            entries.forEach(entry => {
                _parseAndAddEntry(entry)
            });
        }
    }

    /**
     * Gibt die URL zur nächsten Seite des Feeds zurück, falls vorhanden. Sonst null.
     * @param parsedObj 
     */
    getNextPageUrl(xmlString: string): URL {
        var parsedObj = super.parse(xmlString) // todo das bedeutet, dass für Collections der Xml-Baum zweimal geparst wird... fürs Fill und fürs getNextPage

        var result: URL = null
        parsedObj.feed.link.forEach(link => {
            if (result === null && link["@_rel"] == "next") {
                result = new URL(link["@_href"])
            }
        })

        return result
    }
}