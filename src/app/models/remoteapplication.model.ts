import { IEntityModel } from './i-entity-model';
import { EntityLink } from '../common/entity-link';

/**
 * EntityModel einer RemoteApplication.
 *
 * @export
 * @class RemoteApplication
 * @implements {IEntityModel}
 */
export class RemoteApplication implements IEntityModel{
    shouldCopy: boolean;
    public id: String;
    title: String;
    link: EntityLink<any>;
}