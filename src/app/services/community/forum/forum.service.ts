import { Injectable } from '@angular/core';
import { Forum } from 'src/app/models/remote-applications/forum.model';
import { ForumCollectionXmlParser } from 'src/app/xml-parser/remote-applications/forum-collection-xml-parser';
import { EntityLink } from 'src/app/common/entity-link';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { asyncForEach } from 'src/app/common/async-foreach';
import { ApiClientService } from '../../api-client/api-client.service';
import { LoggingService } from '../../logging/logging.service';
import { ForumXmlWriter } from './forum-xml-writer';
import { getConfig } from 'src/app/app-config';
import { HttpResponse } from '@angular/common/http';
import { ForumCollection } from 'src/app/models/remote-applications/forum-collection.model';
import { WidgetService } from '../widget/widget.service';
import { ForumTopic } from 'src/app/models/remote-applications/forumtopic.model';
import { ForumTopicService } from './forumtopic.service';



@Injectable({
    providedIn: 'root'
})
export class ForumService {

    constructor(private apiClient: ApiClientService,
        private loggingService: LoggingService,
        private widgetService: WidgetService) { }


        async loadForum(entity: EntityLink<RemoteApplication>, communityUUid: string): Promise<ForumCollection> {
            var xmlParser: ForumCollectionXmlParser = new ForumCollectionXmlParser();
            var foren = new ForumCollection();

            var url = new URL(getConfig().connectionsUrl + "forums/atom/forums?communityUuid=" + communityUUid);
            //var url = entity.url;
            var nextPageLink: URL = url;

            //xmlParser.fillFromXml(foren, currentXml);  // RemoteApplicationCollection Instanz anhand des XMLs befüllen

            do {
                var currentXml = await this.apiClient.loadXML(nextPageLink);
                nextPageLink = xmlParser.getNextPageUrlHack(entity.url, currentXml);
                xmlParser.fillFromXml(foren, currentXml);  // RemoteApplicationCollection Instanz anhand des XMLs befüllen
            } while (nextPageLink !== null);

            entity.model = foren;
            return foren;
        }

    async createForum(CommunityId: string, forenCollection: ForumCollection): Promise<HttpResponse<any>> {
        var result: HttpResponse<any>;
        var forumsToCopy: Array<Forum> = new Array<Forum>();

        await asyncForEach(forenCollection.foren, async (forum: Forum) => {
            if (forum.shouldCopy) {
                forumsToCopy.push(forum);
            }
        });

        if (forumsToCopy.length > 0) {
            this.loggingService.LogInfo('Start Kopieren von Foren.');
                // Create forums
            var forumWriter = new ForumXmlWriter();
            const copyForumEntries = async () => {
                await asyncForEach(forumsToCopy, async (forum: Forum) => {
                    if (forum.content === undefined) {
                        forum.content = ``; // avoiding "undefined" as description if forum has none
                     }
                    var xml = forumWriter.toXmlString(forum);

                    var url = new URL(getConfig().connectionsUrl + "/forums/atom/forums?communityUuid="+ CommunityId);
                    result = await this.apiClient.postXML(xml, url);
                    //load topics from old forum 
                    if (result.ok) {
                        this.loggingService.LogInfo('Forum Page erstellt.');
                        if (forum.topics.topics.length === 0) {
                            return;

                        } else {
                            //retrieving the new forumId of the created forum from the response (result)
                            var location = new URL(result.headers.get('Location'));
                            var newForumId = location.searchParams.get("forumUuid");
                            var TopicService = new ForumTopicService(this.apiClient, this.loggingService, this.widgetService);
                            await asyncForEach(forum.topics.topics, async (tForumTopic: ForumTopic) => {
                                 await TopicService.createTopic(newForumId, tForumTopic);
                            });

                        }

                    } else {
                            this.loggingService.LogInfo('Forum Page erstellen fehlgeschlagen.');
                    }


                    });
                };
            await copyForumEntries();

        }
        return result;
    }

    }
