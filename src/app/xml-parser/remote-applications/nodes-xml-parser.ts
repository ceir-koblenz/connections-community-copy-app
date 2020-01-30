import { EntityFeedXmlParserAbstract } from '../entity-feed-xml-parser-abstract';
import { NodeXmlParser} from '../remote-applications/node-xml-parser';
import { Node } from 'src/app/models/remote-applications/node.model';

/**
 * XML-Parser für das Parsen der Nodes der Aktivitäten der Community einer Community.
 *
 * @export
 * @class RemoteApplicationCollectionXmlParser
 * @extends {EntityFeedXmlParserAbstract<any>}
 */
export class NodesCollectionXmlParser extends EntityFeedXmlParserAbstract<any>{
    fillFromObject(entity: any, parsedObj: any): void {
        var XmlParser = new NodeXmlParser();
        var entries = parsedObj.feed.entry;
        if (Array.isArray(entries)) {
            entries.forEach(entry => {
                var node = new Node();
                XmlParser.fillFromObject(node,{ entry: entry });
                entity.nodes.push(node);
            });
        } else {
            // Aufgrund der pagination kann es vorkommen, dass entries kein array sondern ein object ist.
            var node = new Node();
            XmlParser.fillFromObject(node,{ entry: (parsedObj.feed.entry) });
            entity.nodes.push(node);
        }        
    }

    
}