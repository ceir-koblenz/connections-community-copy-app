import { IEntityModel } from './i-entity-model';
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
    id: String;
    title: String;
    contentHtml: String;
    datePublished: String;
    dateUpdated: String;
    members: EntityLink<MemberCollection>;
    bookmarks: EntityLink<any>;
    miscApps: EntityLink<RemoteApplicationCollection>;
    widgets: EntityLink<WidgetCollection>;
    logo: EntityLink<Logo>;
    type: String;
}