import { IEntityModel } from './i-entity-model';
import { Layout } from './layout.model';

/**
 * Model für eine LayoutCollection
 *
 * @export
 * @class LayoutCollection
 * @implements {IEntityModel}
 */
export class LayoutCollection implements IEntityModel {
    /**
     * Flag beschreibt, ob die Collection kopiert werden soll; standardmäßig true
     *
     * @type {boolean}
     * @memberof LayoutCollection
     */
    shouldCopy: boolean = true;
    /**
     * die einzelnen Layouts innerhalb der Collection
     *
     * @type {Array<Layout>}
     * @memberof LayoutCollection
     */
    layouts: Array<Layout> = new Array<Layout>();
}