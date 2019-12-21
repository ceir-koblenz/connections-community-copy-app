import { EntityFeedXmlParserAbstract } from './entity-feed-xml-parser-abstract'
import { LayoutCollection } from '../models/layout-collection.model';
import { LayoutXmlParser } from './layout-xml-parser';
import { Layout } from '../models/layout.model';

export class LayoutCollectionXmlParser extends EntityFeedXmlParserAbstract<LayoutCollection>{
    fillFromObject(entity: LayoutCollection, parsedObj: any): void {
        var layoutParser = new LayoutXmlParser();

        parsedObj.feed.entry.forEach(entry => {
            var layoutEntity = new Layout();
            layoutParser.fillFromObject(layoutEntity, { entry: entry });

            entity.layouts.push(layoutEntity);
        });
    }
}