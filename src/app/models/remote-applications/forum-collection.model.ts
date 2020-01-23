import { IEntityModel } from '../i-entity-model';
import { Forum } from './forum.model';
import { EntityLink } from 'src/app/common/entity-link';

/**
 * Model für eine Auflistung mehrerer RemoteApplications
 *
 * @export
 * @class ForumCollection
 * @implements {IEntityModel}
 */
export class ForumCollection implements IEntityModel {

    shouldCopy: boolean;
    public foren: Array<Forum> = new Array<Forum>();
    public id: String;
    title: String;
    link: EntityLink<any>;

}