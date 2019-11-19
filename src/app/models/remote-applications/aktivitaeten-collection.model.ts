import { IEntityModel } from '../i-entity-model';
import { Aktivitaet } from './aktivitaeten.model';

/**
 * Model für eine Auflistung mehrerer RemoteApplications
 *
 * @export
 * @class AktivitaetenCollection
 * @implements {IEntityModel}
 */
export class AktivitaetenCollection implements IEntityModel {
    public aktivitaeten: Array<Aktivitaet> = new Array<Aktivitaet>();
}