import { IEntityModel } from './i-entity-model';
import { RemoteApplication } from './remoteapplication.model' 

/**
 * Model für eine Auflistung mehrerer RemoteApplications
 *
 * @export
 * @class RemoteApplicationCollection
 * @implements {IEntityModel}
 */
export class RemoteApplicationCollection implements IEntityModel {
    public remoteApplications: Array<RemoteApplication> = new Array<RemoteApplication>();
}