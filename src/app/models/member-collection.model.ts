import { IEntityModel } from './i-entity-model';
import { MemberCollectionXmlParser } from '../xml-parser/member-collection-xml-parser';
import { ApiClientService } from '../services/api-client/api-client.service';
import { EntityLink } from '../common/entity-link';
import { Member } from './member.model';

/**
 * Model für eine Auflistung mehrerer Member 
 *
 * @export
 * @class MemberCollection
 * @implements {IEntityModel}
 */
export class MemberCollection implements IEntityModel {
    shouldCopy: boolean;
    public members: Array<Member> = new Array<Member>();
}