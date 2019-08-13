import { EntityModelAbstract } from './entity-model-abstract';
import { EntityLink } from '../helpers/entity-link';
import { CommunityCollection } from './community-collection.model';
import { ApiClientService } from '../services/api-client/api-client.service';
import { ServiceDocumentXmlParser } from '../helpers/servicedocument-xml-parser';

/**
 * Modelklasse für das ServiceDokument, welches den Ausgangspunkt
 * der Navigation durch die Connections-API darstellt.
 *
 * @export
 * @class ServiceDocument
 * @extends {EntityModelAbstract}
 */
export class ServiceDocument extends EntityModelAbstract {
    /**
     * Link, mit dem sich die Liste der Communities laden lassen, in
     * denen der aktuelle Nutzer Mitglied ist.
     *
     * @type {EntityLink<CommunityCollection>}
     * @memberof ServiceDocument
     */
    myCommunitiesLink: EntityLink<CommunityCollection>
    /**
     *Link, mit dem sich die Liste aller zugänglichen Communities
     in IBM Connections laden lassen
     *
     * @type {EntityLink<CommunityCollection>}
     * @memberof ServiceDocument
     */
    allCommunitiesLink: EntityLink<CommunityCollection>

    /**
     *Creates an instance of ServiceDocument.
     * @param {ApiClientService} apiClient
     * @memberof ServiceDocument
     */
    constructor(apiClient: ApiClientService) { 
        super(apiClient);
    }

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

        var xmlParser: ServiceDocumentXmlParser = new ServiceDocumentXmlParser()
        var result = new ServiceDocument(client);

        xmlParser.fillFromXml(result, xmlString); // neue ServiceDocument Instanz anhand des XMLs befüllen
        return result;
    }
}