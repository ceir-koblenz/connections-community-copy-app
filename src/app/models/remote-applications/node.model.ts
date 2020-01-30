import { IEntityModel } from '../i-entity-model';
import { NgFormSelectorWarning } from '@angular/forms';


/**
 * Model für eine Node
 *
 * @export
 * @class Node
 * @implements {IEntityModel}
 */
export class Node implements IEntityModel {
    shouldCopy: boolean;
    Uuid : string;
    title:string;
    href: string;
    ref: string;
    ChildHref: string;
    ChildRef: string;
    private: boolean;
    category: string;
    source: string;
    type: string;
    content : string;
    position : number;
}