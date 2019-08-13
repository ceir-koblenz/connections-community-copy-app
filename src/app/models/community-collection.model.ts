import { IEntityModel } from './i-entity-model';
import { CommunityCollectionXmlParser } from '../helpers/communitycollection-xml-parser';
import { ApiClientService } from '../services/api-client/api-client.service';
import { EntityLink } from '../helpers/entity-link';
import { Community } from './community.model';

/**
 * Model für eine Auflistung mehrerer Communities (siehe bspw uniconnect "Meine Communities")
 *
 * @export
 * @class CommunityCollection
 * @implements {IEntityModel}
 */
export class CommunityCollection implements IEntityModel {

    public communityLinks: Array<EntityLink<Community>> = new Array<EntityLink<Community>>();

    static async load(client: ApiClientService, link: EntityLink<CommunityCollection>): Promise<CommunityCollection> {
        var xmlString = await client.loadXML(link.url); // Raw XML laden

        var xmlParser = new CommunityCollectionXmlParser()
        var result = new CommunityCollection();

        xmlParser.fillFromXml(result, xmlString); // neue CommunityCollection Instanz anhand des XMLs befüllen
        link.model = result;

        return result;
    }
}