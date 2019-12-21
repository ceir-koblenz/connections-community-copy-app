import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { Layout } from '../models/layout.model';

export class LayoutXmlParser extends EntityXmlParserAbstract<Layout>{
    fillFromObject(entity: Layout, parsedObj: any): void {
        entity.pageId = parsedObj.entry["snx:pageId"];
        entity.layoutName = parsedObj.entry["snx:communityLayout"];
    }
}