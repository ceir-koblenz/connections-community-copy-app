import { IEntityModel } from '../i-entity-model';
import { EntityLink } from 'src/app/common/entity-link';

/**
 * EntityModel einer Wiki App.
 *
 * @export
 * @class Wiki
 * @implements {IEntityModel}
 */
export class Wiki implements IEntityModel{

    uUid:String;
	title:String;
	summary:String;
	label:String;
	authorUuid:String;
	visibility:String;
	//List<Member> members = new ArrayList<Member>();
	communityUuid:String;
	//String communityForumWidgetId = "";
	contentUrl:EntityLink<any>;
    
}