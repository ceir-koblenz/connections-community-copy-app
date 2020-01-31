import { IEntityModel } from '../i-entity-model';
import { EntityLink } from 'src/app/common/entity-link';
import { NumberValueAccessor } from '@angular/forms';

/**
 * EntityModel einer File App.
 *
 * @export
 * @class File
 * @implements {IEntityModel}
 */
export class File implements IEntityModel{
	shouldCopy: boolean = false;

    uUid:String;
	title:String;
	summary:String;
	label:String;
	authorUuid:String;
	communityUuid:String;
	fileUrl:string;
	isInFolder:Boolean;
	mediaSize: number;
    
}