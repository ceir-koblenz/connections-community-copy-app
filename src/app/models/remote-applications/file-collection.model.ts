import { IEntityModel } from '../i-entity-model';
import { File } from './file.model';

/**
 * Model für eine Auflistung mehrerer Files
 *
 * @export
 * @class FileCollection
 * @implements {IEntityModel}
 */
export class FileCollection implements IEntityModel {
    shouldCopy: boolean;
    public files: Array<File> = new Array<File>();
}