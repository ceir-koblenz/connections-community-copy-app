import { IEntityModel } from '../i-entity-model';
import { EntityLink } from 'src/app/common/entity-link';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';

/**
 * Model für eine Auflistung mehrerer RemoteApplications
 *
 * @export
 * @class Forum
 * @implements {IEntityModel}
 */
export class Forum implements IEntityModel {
    shouldCopy: boolean;
    public id: String;
    content: String;
    title: String;
    link: EntityLink<any>;
    contentUrl: EntityLink<any>;
    contentXml: String;
    uUid: String;


    static async loadContentXml(client: ApiClientService, entity:Forum): Promise<String> {
		var result = await client.loadXML(entity.contentUrl.url);
		entity.contentXml = result;
		return result;
	}
}