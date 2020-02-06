import { EntityFeedXmlParserAbstract } from '../entity-feed-xml-parser-abstract';
import { Node } from 'src/app/models/remote-applications/node.model';
/**
 * XML-Parser für das Parsen einer Node der Aktivitäten der Community einer Community.
 *
 * @export
 * @class NodeXmlParser
 * @extends {EntityFeedXmlParserAbstract<any>}
 */
export class NodeXmlParser extends EntityFeedXmlParserAbstract<any>{
    fillFromObject(entity: Node, parsedObj: any): void {
        entity.title = parsedObj.entry.title["#text"];
        if (parsedObj.entry.content !== undefined){
            entity.content = parsedObj.entry.content["#text"];
        }
        entity.position = parsedObj.entry["snx:position"];
        if ((parsedObj.entry.category.length > 2) && (parsedObj.entry.category["1"]["@_term"]== "private")){
            entity.private = true; 
        }else{
            entity.private = false;
        }
        entity.ChildHref = parsedObj.entry.link[0]["@_href"];
        entity.ChildRef = parsedObj.entry.id.toLocaleString();
        entity.type = parsedObj.entry["thr:in-reply-to"]["@_type"];
        entity.href = parsedObj.entry["thr:in-reply-to"]["@_href"];
        entity.ref = parsedObj.entry["thr:in-reply-to"]["@_ref"];
        var arr:Array<string> =parsedObj.entry.id.split(":");
        arr.splice(0,arr.length-1);
        entity.Uuid = arr.toLocaleString();
        entity.category = parsedObj.entry.category[0]["@_term"];
        }         
}