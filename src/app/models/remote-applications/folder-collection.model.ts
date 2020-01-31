import { IEntityModel } from '../i-entity-model';
import { File } from './file.model';
import { EntityLink } from 'src/app/common/entity-link';
import { Folder } from './folder.model';

/**
 * Model für eine Auflistung mehrerer Files
 *
 * @export
 * @class FolderCollection
 * @implements {IEntityModel}
 */
export class FolderCollection implements IEntityModel {
    shouldCopy: boolean; // aktuell irrelevant - refactorbedarf
    public folders: Array<Folder> = new Array<Folder>();
    public id: String;
    title: String;
    link: EntityLink<any>;

    getSelectedFilesSize(): number {
        var result = 0;
        this.folders.forEach(x => {
            result += x.getSelectedFilesSize();
        });

        return result;
    }
}