import { IEntityModel } from '../i-entity-model';

/**
 * EntityModel einer Aktivitaet App.
 *
 * @export
 * @class Aktivitaet
 * @implements {IEntityModel}
 */
export class Aktivitaet implements IEntityModel {

	uUid: String;
	title: String;
	published: String;
	updated: String;
	authorUuid: String;
	duedate: String;
	ziel: String;
	priority: String;
	group: String;

}