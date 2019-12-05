import { IEntityModel } from '../i-entity-model';
import { EntityLink } from 'src/app/common/entity-link';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';

/**
 * EntityModel einer Wiki App.
 *
 * @export
 * @class Wiki
 * @implements {IEntityModel}
 */
export class Wiki implements IEntityModel {
	shouldCopy: boolean = false;

	uUid: String;
	title: String;
	summary: String;
	label: String;
	authorUuid: String;
	visibility: String;
	//List<Member> members = new ArrayList<Member>();
	communityUuid: String;
	//String communityForumWidgetId = "";
	contentUrl: EntityLink<any>;
	contentXml: String;

	static async loadContentXml(client: ApiClientService, entity:Wiki): Promise<String> {
		var result = await client.loadXML(entity.contentUrl.url)
		entity.contentXml = result
		return result
	}

}