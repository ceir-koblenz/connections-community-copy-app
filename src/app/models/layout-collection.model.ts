import { IEntityModel } from './i-entity-model';
import { Layout } from './layout.model';

export class LayoutCollection implements IEntityModel {
    readonly shouldCopy: boolean = true;
    layouts: Array<Layout> = new Array<Layout>();
}