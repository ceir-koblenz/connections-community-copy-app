import { IEntityModel } from './i-entity-model';
import { EntityLink } from '../common/entity-link';

/**
 * EntityModel eines Widgets.
 *
 * @export
 * @class Widget
 * @implements {IEntityModel}
 */
export class Widget implements IEntityModel{
    public id: String;
    title: String;
    link: EntityLink<any>;
}