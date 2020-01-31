import { IEntityModel } from '../i-entity-model';
import { EntityLink } from 'src/app/common/entity-link';
import { File } from './file.model';
import { ThrowStmt } from '@angular/compiler';
import { FileSizeService } from 'src/app/services/community/file/file-size.service';

/**
 * EntityModel eines Folders.
 *
 * @export
 * @class Folder
 * @implements {IEntityModel}
 */
export class Folder implements IEntityModel {
	shouldCopy: boolean = false;
	shouldCopyAll: boolean = false;

	uUid: String;
	title: String;
	label: String;
	authorUuid: String;
	communityUuid: String;
	files: Array<File> = new Array<File>();
	childFolders: Array<Folder> = new Array<Folder>();
	feed_link: string;
	parent:Folder = null;
	summary:String;

	isFileSelected(): boolean {
		for (let index = 0; index < this.files.length; index++) {
			var file:File = this.files[index];
			if (file.shouldCopy) {
				return true;
			}
		}
		return false;
	}

	static markAllShouldCopy(fileSizeService:FileSizeService,folder: Folder, value:boolean) {		
		// mark folder itself
		folder.shouldCopy = value;
		folder.shouldCopyAll = value;
		// go through all files in this folder an set shouldCopy = !shouldCopy
		for (let index = 0; index < folder.files.length; index++) {
			folder.files[index].shouldCopy = value;
			fileSizeService.changeSize(folder.files[index]);
		}	
		if (folder.childFolders.length == 0) {
			return; // Abbruchbedingung, wenn keine childFolders mehr vorhanden sind
		} else {
			folder.shouldCopy = value;
			for (let index = 0; index < folder.childFolders.length; index++) {
				this.markAllShouldCopy(fileSizeService,folder.childFolders[index], value);
			}
		}
	}

	static markParentShouldCopy(folder: Folder, value:boolean) {
		folder.shouldCopy = value;
		if (folder.parent == null) {
			return;
		} else {
			this.markParentShouldCopy(folder.parent, value);
		}
	}

}