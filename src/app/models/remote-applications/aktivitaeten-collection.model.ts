import { IEntityModel } from '../i-entity-model';
import { Aktivitaet } from './aktivitaeten.model';
import { EntityLink } from 'src/app/common/entity-link';

/**
 * Model für eine Auflistung mehrerer RemoteApplications
 *
 * @export
 * @class AktivitaetenCollection
 * @implements {IEntityModel}
 */
export class AktivitaetenCollection implements IEntityModel {
    shouldCopy: boolean;
    public aktivitaeten: Array<Aktivitaet> = new Array<Aktivitaet>();
    public id: String;
    title: String;
    link: EntityLink<any>;
}