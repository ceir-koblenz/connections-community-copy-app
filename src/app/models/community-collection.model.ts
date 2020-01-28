import { IEntityModel } from './i-entity-model';
import { Community } from './community.model';

/**
 * Model für eine Auflistung mehrerer Communities (siehe bspw uniconnect "Meine Communities")
 *
 * @export
 * @class CommunityCollection
 * @implements {IEntityModel}
 */
export class CommunityCollection implements IEntityModel {
    shouldCopy: boolean;
    public communities: Array<Community> = new Array<Community>();
}