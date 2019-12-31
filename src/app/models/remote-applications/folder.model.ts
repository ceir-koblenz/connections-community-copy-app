import { IEntityModel } from '../i-entity-model';
import { EntityLink } from 'src/app/common/entity-link';

/**
 * EntityModel eines Folders.
 *
 * @export
 * @class Folder
 * @implements {IEntityModel}
 */
export class Folder implements IEntityModel {
	shouldCopy: boolean;

	uUid: String;
	title: String;
	label: String;
	authorUuid: String;
	communityUuid: String;
	files: Array<File> = new Array<File>();
	childFolders: Array<Folder> = new Array<Folder>();
	feed_link: string;

}