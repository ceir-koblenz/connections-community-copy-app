import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { ServiceDocument } from '../models/service-document.model';
import { EntityLink } from './entity-link';
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
     * Befüllt die übergebene, neue ServiceDokument Instanz anhand des übergebenen XMl-Strings
     *
     * @param {ServiceDocument} entity
     * @param {string} xmlString
     * @memberof ServiceDocumentXmlParser
     */
    fillFromXml(entity: ServiceDocument, xmlString: string): void {
        var json = super.parse(xmlString);
        var collections = json.service.workspace.collection;

        collections.forEach(element => {
            if (element["atom:category"]["@_term"] === "public") {
                entity.allCommunitiesLink = new EntityLink<CommunityCollection>(element["@_href"], "") //TODO: name
            } else if (element["atom:category"]["@_term"] === "personal") {
                entity.myCommunitiesLink = new EntityLink<CommunityCollection>(element["@_href"], "") //TODO: name
            }
        });

        console.log(entity);
    }
}