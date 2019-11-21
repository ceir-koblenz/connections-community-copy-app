import { IEntityModel } from '../i-entity-model';
import { EntityLink } from 'src/app/common/entity-link';

/**
 * EntityModel einer File App.
 *
 * @export
 * @class File
 * @implements {IEntityModel}
 */
export class File implements IEntityModel{
	shouldCopy: boolean;

    uUid:String;
	title:String;
	summary:String;
	label:String;
	authorUuid:String;
	communityUuid:String;
    fileUrl:String;
    
}