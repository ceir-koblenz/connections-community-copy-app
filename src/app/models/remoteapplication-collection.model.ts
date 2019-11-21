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
    shouldCopy: boolean;
    public remoteApplications: Array<RemoteApplication> = new Array<RemoteApplication>();

    static async load(client: ApiClientService, link: EntityLink<RemoteApplicationCollection>): Promise<RemoteApplicationCollection> {
        var xmlParser = new RemoteApplicationCollectionXmlParser()
        var result = new RemoteApplicationCollection();

        var nextPageLink: URL = link.url;

        do {
            var currentXml = await client.loadXML(nextPageLink)
            nextPageLink = xmlParser.getNextPageUrl(currentXml)
            xmlParser.fillFromXml(result, currentXml)  // RemoteApplicationCollection Instanz anhand des XMLs befüllen
        } while (nextPageLink !== null);

        link.model = result;

        return result;
    }
}