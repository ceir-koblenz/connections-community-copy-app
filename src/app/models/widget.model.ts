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
    /**
     * Flag, ob das Widget erstellt werden soll oder nicht.
     *
     * @type {boolean}
     * @memberof Widget
     */
    public shouldCopy: boolean = false;
    /**
     * Die id Des Widgets
     *
     * @type {string}
     * @memberof Widget
     */
    public id: string;
    /**
     * Der Titel des Widgets
     *
     * @type {string}
     * @memberof Widget
     */
    public title: string;
    /**
     * Die Definitions-Id des Widgets. Identifiziert den Widgettypen eindeutig.
     *
     * @type {string}
     * @memberof Widget
     */
    public widgetDefId: string;
}