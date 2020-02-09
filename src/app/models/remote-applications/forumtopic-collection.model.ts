import { IEntityModel } from '../i-entity-model';
import { ForumTopic } from './forumtopic.model';
import { EntityLink } from 'src/app/common/entity-link';

/**
 * Model für eine Auflistung mehrerer RemoteApplications
 *
 * @export
 * @class ForumCollection
 * @implements {IEntityModel}
 */
export class ForumTopicCollection implements IEntityModel {

    shouldCopy: boolean;
    topics: Array<ForumTopic> = new Array<ForumTopic>();
    id: String;
    title: String;
    link: EntityLink<any>;
}