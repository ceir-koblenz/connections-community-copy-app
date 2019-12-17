import { IEntityModel } from '../i-entity-model';
import { EntityLink } from 'src/app/common/entity-link';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';

/**
 * Model für eine Auflistung mehrerer RemoteApplications
 *
 * @export
 * @class Blog
 * @implements {IEntityModel}
 */
export class Blog implements IEntityModel {
	summary: String;
	content: String;
    shouldCopy: boolean;
    public id: String;
    title: String;
    link: EntityLink<any>;
    contentUrl: EntityLink<any>;
	contentXml: String;

    static async loadContentXml(client: ApiClientService, entity:Blog): Promise<String> {
		var result = await client.loadXML(entity.contentUrl.url)
		entity.contentXml = result
		return result
	}
}