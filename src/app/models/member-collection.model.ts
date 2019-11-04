import { IEntityModel } from './i-entity-model';
import { MemberCollectionXmlParser } from '../xml-parser/member-collection-xml-parser';
import { ApiClientService } from '../services/api-client/api-client.service';
import { EntityLink } from '../common/entity-link';
import { Member } from './member.model';

/**
 * Model für eine Auflistung mehrerer Member 
 *
 * @export
 * @class MemberCollection
 * @implements {IEntityModel}
 */
export class MemberCollection implements IEntityModel {
    public membercollection: Array<Member> = new Array<Member>();

    /**
     * Lädt die MemberCollection anhand der übergebenen Url von der Api und
     * befüllt die Objektinstanz.
     *
     * @static
     * @param {ApiClientService} client
     * @param {EntityLink<CommunityCollection>} link
     * @returns {Promise<CommunityCollection>}
     * @memberof MemberCollection     
     */
    static async load(client: ApiClientService, link: EntityLink<MemberCollection>): Promise<MemberCollection> {
        var xmlString = await client.loadXML(link.url); // Raw XML laden

        var xmlParser = new MemberCollectionXmlParser();
        var result = new MemberCollection();

        xmlParser.fillFromXml(result, xmlString); // neue MemberCollection Instanz anhand des XMLs befüllen
        link.model = result;

        return result;
    }
}