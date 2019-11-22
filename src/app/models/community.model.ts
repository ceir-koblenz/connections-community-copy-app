import { IEntityModel } from './i-entity-model';
import { ApiClientService } from '../services/api-client/api-client.service';
import { CommunityXmlParser } from '../xml-parser/community-xml-parser';
import { EntityLink } from '../common/entity-link';
import { Logo } from './logo.model';
import { MemberCollection } from './member-collection.model';
import { RemoteApplicationCollection } from './remoteapplication-collection.model';
import { WidgetCollection } from './widget-collection.model';

/**
 * EntityModel einer Community.
 *
 * @export
 * @class Community
 * @implements {IEntityModel}
 */
export class Community implements IEntityModel {
    shouldCopy: boolean;
    public id: String;
    title: String;
    summary: String;
    datePublished: String;
    dateUpdated: String;
    members: EntityLink<MemberCollection>; // any durch entsprechenden Modeltypen erstetzen, sobald dieser implementiert ist
    bookmarks: EntityLink<any>;
    miscApps: EntityLink<RemoteApplicationCollection>;
    widgets: EntityLink<WidgetCollection>;
    logo: EntityLink<Logo>;
    type: String;
}