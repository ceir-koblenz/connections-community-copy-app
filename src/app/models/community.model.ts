import { IEntityModel } from './i-entity-model';
import { ApiClientService } from '../services/api-client/api-client.service';
import { CommunityXmlParser } from '../xml-parser/community-xml-parser';
import { EntityLink } from '../common/entity-link';
import { Logo } from './logo.model';

/**
 * EntityModel einer Community.
 *
 * @export
 * @class Community
 * @implements {IEntityModel}
 */
export class Community implements IEntityModel{
    public id: String;
    title: String;
    summary: String;
    datePublished: String;
    dateUpdated: String;
    //author: EntityLink<any>;
    members: EntityLink<any>; // any durch entsprechenden Modeltypen erstetzen, sobald dieser implementiert ist
    bookmarks: EntityLink<any>;
    miscApps: EntityLink<any>;
    logo: EntityLink<Logo>;

    /**
     * Lädt die Community anhand der übergebenen Url von der Api.
     * Lädt den XML-String von der Api und parst diesen anschließend.
     *
     * @static
     * @param {ApiClientService} client
     * @param {URL} url
     * @returns {Promise<Community>}
     * @memberof Community
     */
    static async load(client: ApiClientService, url: URL): Promise<Community> {
        var xmlString = await client.loadXML(url); // Raw XML laden

        var xmlParser: CommunityXmlParser = new CommunityXmlParser()
        var result = new Community();

        xmlParser.fillFromXml(result, xmlString); // neue Community Instanz anhand des XMLs befüllen
        
        return result;
    }
}