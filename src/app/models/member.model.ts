import { IEntityModel } from './i-entity-model';
import { ApiClientService } from '../services/api-client/api-client.service';
import { CommunityXmlParser } from '../xml-parser/community-xml-parser';
import { EntityLink } from '../common/entity-link';
import { MemberXmlParser } from '../xml-parser/member-xml';

/**
 * EntityModel eines Members.
 *
 * @export
 * @class Member
 * @implements {IEntityModel}
 */
export class Member implements IEntityModel{
    public UUid: String;
    public name: String;
    public email: String;
    public role: String;
    public Uebernehmen: Boolean;




    /**
     * Lädt einen Member anhand der übergebenen Url von der Api.
     * Lädt den XML-String von der Api und parst diesen anschließend.
     *
     * @static
     * @param {ApiClientService} client
     * @param {URL} url
     * @returns {Promise<Community>}
     * @memberof Community
     */
    static async load(client: ApiClientService, url: URL): Promise<Member> {
        var xmlString = await client.loadXML(url); // Raw XML laden

        var xmlParser: MemberXmlParser = new MemberXmlParser()
        var result = new Member();

        xmlParser.fillFromXml(result, xmlString); // neue Member Instanz anhand des XMLs befüllen
        return result;
    }
}