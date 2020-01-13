import { IEntityModel } from './i-entity-model';

/**
 * EntityModel eines Members.
 *
 * @export
 * @class Member
 * @implements {IEntityModel}
 */
export class Member implements IEntityModel{
    shouldCopy: boolean;
    /**
     * Die Id, die den Nutzer eindeutig identifiziert
     *
     * @type {String}
     * @memberof Member
     */
    public UUid: String;
    /**
     * Der Anzeigename des Nutzers
     *
     * @type {String}
     * @memberof Member
     */
    public name: String;
    /**
     * Die Mailadresse des Nutzers
     *
     * @type {String}
     * @memberof Member
     */
    public email: String;
    /**
     * Die Rolle des Nutzers in der aktuellen Community (bspw. admin)
     *
     * @type {String}
     * @memberof Member
     */
    public role: String;
}