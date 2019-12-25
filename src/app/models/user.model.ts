import { IEntityModel } from './i-entity-model';
import { ApiClientService } from '../services/api-client/api-client.service';
import { CommunityXmlParser } from '../xml-parser/community-xml-parser';
import { EntityLink } from '../common/entity-link';
import { userXmlParser } from '../xml-parser/user-xml';

/**
 * EntityModel des User.
 *
 * @export
 * @class User
 * @implements {IEntityModel}
 */
export class User implements IEntityModel{
    public UUid: String;
    shouldCopy: boolean;




    /**
     * Lädt den aktuellen User anhand der übergebenen Url von der Api.
     * Lädt den XML-String von der Api und parst diesen anschließend.
     *
     * @static
     * @param {ApiClientService} client
     * @param {URL} url
     * @returns {Promise<Community>}
     * @memberof Community
     */
    static async load(client: ApiClientService, url: URL): Promise<User> {
        var xmlString = await client.loadXML(url); // Raw XML laden

        var xmlParser: userXmlParser = new userXmlParser()
        var result = new User();

        xmlParser.fillFromXml(result, xmlString); // User Instanz anhand des XMLs befüllen
        return result;
    }
}