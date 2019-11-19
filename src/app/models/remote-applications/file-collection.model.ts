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
    public files: Array<File> = new Array<File>();
}