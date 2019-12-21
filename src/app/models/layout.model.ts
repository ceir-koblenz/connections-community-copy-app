import { IEntityModel } from './i-entity-model';

export class Layout implements IEntityModel{
    readonly shouldCopy: boolean = true;
    pageId: String;
    layoutName: String;
}