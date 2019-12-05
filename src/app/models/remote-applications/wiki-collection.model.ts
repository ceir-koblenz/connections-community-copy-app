import { IEntityModel } from '../i-entity-model';
import { Wiki } from './wiki.model';
import { EntityLink } from 'src/app/common/entity-link';

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
    public id: String;
    title: String;
    link: EntityLink<any>;

}