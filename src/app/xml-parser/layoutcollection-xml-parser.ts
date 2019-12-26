import { EntityFeedXmlParserAbstract } from './entity-feed-xml-parser-abstract'
import { LayoutCollection } from '../models/layout-collection.model';
import { LayoutXmlParser } from './layout-xml-parser';
import { Layout } from '../models/layout.model';

export class LayoutCollectionXmlParser extends EntityFeedXmlParserAbstract<LayoutCollection>{
    fillFromObject(collection: LayoutCollection, parsedObj: any): void {
        var entries = parsedObj.feed.entry;
        var parser = new LayoutXmlParser();

        const _parseAndAddEntry = (x) => {
            var entity = new Layout();
            parser.fillFromObject(entity, x);

            collection.layouts.push(entity);
        }

        if (entries.length === undefined) {
            _parseAndAddEntry(entries);
        } else {
            entries.forEach(entry => {
                _parseAndAddEntry(entry);
            });
        }
    }
}