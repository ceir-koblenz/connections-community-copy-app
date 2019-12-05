import { IEntityModel } from '../i-entity-model';
import { EntityLink } from 'src/app/common/entity-link';
import { BlogEntry } from './blog-entry.model';
/**
 * EntityModel einer Blog App.
 *
 * @export
 * @class Blog
 * @implements {IEntityModel}
 */
export class Blog implements IEntityModel{
	shouldCopy: boolean;
    id:String;
	title:String;
	subtitle:String;
	updated:String;
	entrycount:String;
	public entries: Array<BlogEntry> = new Array<BlogEntry>();
	link: EntityLink<any>;
}