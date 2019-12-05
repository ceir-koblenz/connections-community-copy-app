import { IEntityModel } from '../i-entity-model';
import { EntityLink } from 'src/app/common/entity-link';

/**
 * Model für eine Auflistung mehrerer RemoteApplications
 *
 * @export
 * @class Blog
 * @implements {IEntityModel}
 */
export class BlogEntry implements IEntityModel {
	summary: String;
	content: String;
    shouldCopy: boolean;
    public id: String;
    title: String;
    link: EntityLink<any>;
}