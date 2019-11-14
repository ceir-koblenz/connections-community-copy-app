import { IEntityModel } from './i-entity-model';
import { RemoteApplication } from './remoteapplication.model' 
import { ApiClientService } from '../services/api-client/api-client.service';
import { EntityLink } from '../common/entity-link';
import { RemoteApplicationCollectionXmlParser } from '../xml-parser/remoteapplicationcollection-xml-parser';

/**
 * Model für eine Auflistung mehrerer RemoteApplications
 *
 * @export
 * @class RemoteApplicationCollection
 * @implements {IEntityModel}
 */
export class RemoteApplicationCollection implements IEntityModel {
    public remoteApplications: Array<RemoteApplication> = new Array<RemoteApplication>();

    static async load(client: ApiClientService, link: EntityLink<RemoteApplicationCollection>): Promise<RemoteApplicationCollection> {
        var xmlString = await client.loadXML(link.url); // Raw XML laden

        var xmlParser = new RemoteApplicationCollectionXmlParser()
        var result = new RemoteApplicationCollection();

        xmlParser.fillFromXml(result, xmlString); // neue RemoteApplicationCollection Instanz anhand des XMLs befüllen
        link.model = result;

        return result;
    }
}