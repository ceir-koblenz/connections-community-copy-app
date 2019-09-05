import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { ServiceDocument } from '../models/service-document.model';
import { EntityLink } from '../common/entity-link';
import { CommunityCollection } from '../models/community-collection.model';

/**
 * XML-Parser zum Parsen einer ServiceDocument-Instanz aus einem XML-Dokument.
 *
 * @export
 * @class ServiceDocumentXmlParser
 * @extends {EntityXmlParserAbstract<ServiceDocument>}
 */
export class ServiceDocumentXmlParser extends EntityXmlParserAbstract<ServiceDocument>{
    /**
     * Befüllt die übergebene, neue ServiceDokument Instanz anhand des übergebenen JSON-Objekts
     *
     * @param {ServiceDocument} entity
     * @param {any} parsedObj
     * @memberof ServiceDocumentXmlParser
     */
    fillFromObject(entity: ServiceDocument, parsedObj: any): void {
        var collections = parsedObj.service.workspace.collection;

        collections.forEach(element => {
            var term = element["atom:category"]["@_term"]
            if (term === "public") {
                entity.allCommunitiesLink = new EntityLink<CommunityCollection>(element["@_href"], 
                element["atom:title"]["#text"])
            } else if (term === "personal") {
                entity.myCommunitiesLink = new EntityLink<CommunityCollection>(element["@_href"], 
                element["atom:title"]["#text"])
            }
        });
    }
}