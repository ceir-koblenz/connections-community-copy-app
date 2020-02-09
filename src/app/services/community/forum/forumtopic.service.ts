import { Injectable } from '@angular/core';
import { ForumTopic } from 'src/app/models/remote-applications/forumtopic.model';
import { EntityLink } from 'src/app/common/entity-link';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { ApiClientService } from '../../api-client/api-client.service';
import { LoggingService } from '../../logging/logging.service';
import { ForumTopicXmlWriter } from './forumtopic-xml-writer';
import { getConfig } from 'src/app/app-config';
import { HttpResponse } from '@angular/common/http';
import { ForumTopicCollection } from 'src/app/models/remote-applications/forumtopic-collection.model';
import { WidgetService } from '../widget/widget.service';
import { ForumTopicCollectionXmlParser } from 'src/app/xml-parser/remote-applications/forumtopic-collection-xml-parser';


@Injectable({
    providedIn: 'root'
})
export class ForumTopicService {

    constructor(private apiClient: ApiClientService,
        private loggingService: LoggingService,
        private widgetService: WidgetService) { }

        async createTopic(newForumId: string, topic: ForumTopic): Promise<HttpResponse<any>> {
            var result: HttpResponse<any>;
            if (topic.shouldCopy) {
                this.loggingService.LogInfo('Start Kopieren von Topics.');
                var topicWriter = new ForumTopicXmlWriter();

                if (topic.content === undefined) {
                    topic.content = ``; //avoiding undefined as topic content if there is none
                }

                var xml = topicWriter.toXmlString(topic);
                var url = new URL(getConfig().connectionsUrl + "/forums/atom/topics?forumUuid="+ newForumId);
                result = await this.apiClient.postXML(xml, url);
                if (result.ok) {
                    this.loggingService.LogInfo('Forum Topic erstellt.');
                } else {
                    this.loggingService.LogInfo('Forum Topic erstellen fehlgeschlagen.');
                            }

                }
            return result;

            }
              async loadTopic(entity: EntityLink<RemoteApplication>, forumUUid: String): Promise<ForumTopicCollection> {
                var xmlParser: ForumTopicCollectionXmlParser = new ForumTopicCollectionXmlParser();
                var topics = new ForumTopicCollection();
                var url = new URL(getConfig().connectionsUrl + "forums/atom/topics?forumUuid=" + forumUUid);
                var nextPageLink: URL = url;
                do {
                    var currentXml = await this.apiClient.loadXML(nextPageLink);
                    nextPageLink = xmlParser.getNextPageUrlHack(url, currentXml);
                    xmlParser.fillFromXml(topics, currentXml);  // RemoteApplicationCollection Instanz anhand des XMLs befüllen
                } while (nextPageLink !== null);

                //entity.model = topics;  //conflict in create-template.service otherwise
                return topics;
            }


}
