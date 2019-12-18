import { AktivitaetenCollection } from 'src/app/models/remote-applications/aktivitaeten-collection.model';
import { AktivitaetXmlParser } from './aktivitaeten-xml-parser';
import { Aktivitaet } from 'src/app/models/remote-applications/aktivitaeten.model';
import { EntityFeedXmlParserAbstract } from '../entity-feed-xml-parser-abstract';

/**
 * XML-Parser für das Parsen der Aktivitäten Collection einer Community.
 *
 * @export
 * @class AktivitaetenCollectionXmlParser
 * @extends {EntityFeedXmlParserAbstract<any>}
 */
export class AktivitaetenCollectionXmlParser extends EntityFeedXmlParserAbstract<any>{
    fillFromObject(entity: AktivitaetenCollection, parsedObj: any): void {
        var memberParser = new AktivitaetXmlParser();
        if (parsedObj.feed.entry.length !== undefined) {
            parsedObj.feed.entry.forEach(entry => {
                var memEntity = new Aktivitaet();
                memberParser.fillFromObject(memEntity, { entry: entry });

                entity.aktivitaeten.push(memEntity);
            });
        } else {
            var memEntity = new Aktivitaet();
            memberParser.fillFromObject(memEntity, { entry: (parsedObj.feed.entry) });

            entity.aktivitaeten.push(memEntity);
        }
    }
}