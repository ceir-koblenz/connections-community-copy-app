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