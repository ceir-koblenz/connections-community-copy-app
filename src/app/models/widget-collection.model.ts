import { IEntityModel } from './i-entity-model';
import { Widget } from './widget.model' 

/**
 * Model für eine Auflistung mehrerer Widgets
 *
 * @export
 * @class WidgetCollection
 * @implements {IEntityModel}
 */
export class WidgetCollection implements IEntityModel {
    shouldCopy: boolean;
    public Widgets: Array<Widget> = new Array<Widget>();
}