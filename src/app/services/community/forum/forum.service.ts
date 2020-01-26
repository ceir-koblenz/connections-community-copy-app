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
import { WidgetXmlWriter } from '../widget/widget-xml-writer';
import { WidgetService } from '../widget/widget.service';


@Injectable({
    providedIn: 'root'
})
export class ForumService {

    constructor(private apiClient: ApiClientService,
        private loggingService: LoggingService,
        private widgetService: WidgetService) { }

    async load(entity: EntityLink<RemoteApplication>, communityUUid: string): Promise<ForumCollection> {
        var xmlParser: ForumCollectionXmlParser = new ForumCollectionXmlParser();
        var foren = new ForumCollection();

       // var url = new URL(getConfig().connectionsUrl + "forums/atom/topics?communityUuid=" + communityUUid);
        var url = entity.url;
        var nextPageLink: URL = entity.url;

        //xmlParser.fillFromXml(foren, currentXml);  // RemoteApplicationCollection Instanz anhand des XMLs befüllen

        do {
            var currentXml = await this.apiClient.loadXML(nextPageLink);
            nextPageLink = xmlParser.getNextPageUrlHack(entity.url, currentXml);
            xmlParser.fillFromXml(foren, currentXml);  // RemoteApplicationCollection Instanz anhand des XMLs befüllen
        } while (nextPageLink !== null);


        entity.model = foren;
        return foren;
    }

    async create(newCommunityId: string, forenCollection: ForumCollection): Promise<HttpResponse<any>> {
        var result: HttpResponse<any>;
        return result;
    }

}
