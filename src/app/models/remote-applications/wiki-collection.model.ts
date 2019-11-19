import { IEntityModel } from '../i-entity-model';
import { Wiki } from './wiki.model';

/**
 * Model für eine Auflistung mehrerer RemoteApplications
 *
 * @export
 * @class WikiCollection
 * @implements {IEntityModel}
 */
export class WikiCollection implements IEntityModel {
    shouldCopy: boolean;
    public wikis: Array<Wiki> = new Array<Wiki>();
}