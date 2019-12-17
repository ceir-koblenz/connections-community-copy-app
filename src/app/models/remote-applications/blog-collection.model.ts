import { IEntityModel } from '../i-entity-model';
import { EntityLink } from 'src/app/common/entity-link';
import { Blog } from './blog.model';
/**
 * EntityModel einer Blog App.
 *
 * @export
 * @class Blog
 * @implements {IEntityModel}
 */
export class BlogCollection implements IEntityModel{
	shouldCopy: boolean;
    id:String;
	title:String;
	subtitle:String;
	updated:String;
	entrycount:String;
	public blogs: Array<Blog> = new Array<Blog>();
	link: EntityLink<any>;
}