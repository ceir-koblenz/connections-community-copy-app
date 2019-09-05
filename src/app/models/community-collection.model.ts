import { IEntityModel } from './i-entity-model';
import { CommunityCollectionXmlParser } from '../xml-parser/communitycollection-xml-parser';
import { ApiClientService } from '../services/api-client/api-client.service';
import { EntityLink } from '../common/entity-link';
import { Community } from './community.model';

/**
 * Model für eine Auflistung mehrerer Communities (siehe bspw uniconnect "Meine Communities")
 *
 * @export
 * @class CommunityCollection
 * @implements {IEntityModel}
 */
export class CommunityCollection implements IEntityModel {
    public communities: Array<Community> = new Array<Community>();

    /**
     * Lädt die CommunityCollection anhand der übergebenen Url von der Api und
     * befüllt die Objektinstanz.
     *
     * @static
     * @param {ApiClientService} client
     * @param {EntityLink<CommunityCollection>} link
     * @returns {Promise<CommunityCollection>}
     * @memberof CommunityCollection
     */
    static async load(client: ApiClientService, link: EntityLink<CommunityCollection>): Promise<CommunityCollection> {
        var xmlString = await client.loadXML(link.url); // Raw XML laden

        var xmlParser = new CommunityCollectionXmlParser()
        var result = new CommunityCollection();

        xmlParser.fillFromXml(result, xmlString); // neue CommunityCollection Instanz anhand des XMLs befüllen
        link.model = result;

        return result;
    }
}