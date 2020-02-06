import { IEntityModel } from '../i-entity-model';
import { Node } from '../remote-applications/node.model';


/**
 * Model für eine Auflistung mehrerer Aktivitäten-Nodes
 *
 * @export
 * @class NodeCollection
 * @implements {IEntityModel}
 */
export class NodeCollection implements IEntityModel {
    shouldCopy: boolean;
    public nodes: Array<Node> = new Array<Node>();
}