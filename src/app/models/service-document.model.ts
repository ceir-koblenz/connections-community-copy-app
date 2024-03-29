import { IEntityModel } from './i-entity-model';
import { EntityLink } from '../common/entity-link';
import { CommunityCollection } from './community-collection.model';
import { ApiClientService } from '../services/api-client/api-client.service';
import { ServiceDocumentXmlParser } from '../xml-parser/servicedocument-xml-parser';

/**
 * Modelklasse für das ServiceDokument, welches den Ausgangspunkt
 * der Navigation durch die Connections-API darstellt.
 *
 * @export
 * @class ServiceDocument
 * @implements {IEntityModel}
 */
export class ServiceDocument implements IEntityModel {
    shouldCopy: boolean = false;
    
    /**
     * Link, mit dem sich die Liste der Communities laden lassen, in
     * denen der aktuelle Nutzer Mitglied ist.
     *
     * @type {EntityLink<CommunityCollection>}
     * @memberof ServiceDocument
     */
    myCommunitiesLink: EntityLink<CommunityCollection>

    /**
     * Lädt das ServiceDokument anhand der übergebenen Url von der Api.
     * Lädt den XML-String von der Api und parst diesen anschließend.
     *
     * @static
     * @param {ApiClientService} client
     * @param {URL} url
     * @returns {Promise<ServiceDocument>}
     * @memberof ServiceDocument
     */
    static async load(client: ApiClientService, url: URL): Promise<ServiceDocument> {
        var xmlString = await client.loadXML(url); // Raw XML laden
        if (xmlString) {
            var xmlParser: ServiceDocumentXmlParser = new ServiceDocumentXmlParser()
            var result = new ServiceDocument();

            xmlParser.fillFromXml(result, xmlString); // neue ServiceDocument Instanz anhand des XMLs befüllen
            return result;
        }

        return null;
    }
}