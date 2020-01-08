import { Injectable } from '@angular/core';
import { WikiCollection } from 'src/app/models/remote-applications/wiki-collection.model';
import { Wiki } from 'src/app/models/remote-applications/wiki.model';
import { WikiCollectionXmlParser } from 'src/app/xml-parser/remote-applications/wiki-collection-xml-parser';
import { EntityLink } from 'src/app/common/entity-link';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { asyncForEach } from 'src/app/common/async-foreach';
import { ApiClientService } from '../../api-client/api-client.service';
import { LoggingService } from '../../logging/logging.service';
import { WikiXmlWriter } from './wiki-xml-writer';
import { getConfig } from 'src/app/app-config';
import { WidgetXmlWriter } from '../widget-xml-writer';
import { HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WikiService {

    constructor(private apiClient: ApiClientService,
        private loggingService: LoggingService) { }

    async load(entity: EntityLink<RemoteApplication>): Promise<WikiCollection> {
        var xmlParser: WikiCollectionXmlParser = new WikiCollectionXmlParser();
        var wikis = new WikiCollection();

        var nextPageLink: URL = entity.url;

        do {
            var currentXml = await this.apiClient.loadXML(nextPageLink)
            nextPageLink = xmlParser.getNextPageUrlHack(entity.url, currentXml)
            xmlParser.fillFromXml(wikis, currentXml)  // RemoteApplicationCollection Instanz anhand des XMLs befüllen
        } while (nextPageLink !== null);

        /* Könnte auch im Hintergrund laufen... load content xml of wikis
        wikis.wikis.forEach(async (wiki) => {
            await Wiki.loadContentXml(this.apiClient, wiki);
        });
        */

        // wiki ist erst dann vollständig geladen, wenn auch der Content geladen ist
        const loadWikiContent = async () => {
            await asyncForEach(wikis.wikis, async (wiki) => {
                await Wiki.loadContentXml(this.apiClient, wiki);
            })
        }
        await loadWikiContent();

        entity.model = wikis;
        return wikis;
    }

    async create(newCommunityId: string, wikiCollection: WikiCollection):Promise<HttpResponse<any>> {
        var result: HttpResponse<any>;
        var wikisToCopy: Array<Wiki> = new Array<Wiki>();
        const getWikisToCopy = async () => {
            await asyncForEach(wikiCollection.wikis, async (wiki:Wiki) => {
                if (wiki.shouldCopy) {
                    wikisToCopy.push(wiki);
                }
            });
        }
        await getWikisToCopy();

        if (wikisToCopy.length > 0) {
            this.loggingService.LogInfo('Start kopieren von Wikis.')
            // Create a new wiki widget
            var widgetWriter = new WidgetXmlWriter()
            var xml = widgetWriter.toXmlString("Wiki")
            var url = new URL(getConfig().connectionsUrl + "/communities/service/atom/community/widgets?communityUuid=" + newCommunityId)
            result = await this.apiClient.postXML(xml, url)
            if (result.ok) {
                this.loggingService.LogInfo('Wiki Widget erstellt.')
                // Create entries/pages
                var wikiWriter = new WikiXmlWriter()
                const copyWikiEntries = async () => {
                    await asyncForEach(wikisToCopy, async (wiki) => {
                        var xml = wikiWriter.toXmlString(wiki)
                        url = new URL(getConfig().connectionsUrl + "/wikis/basic/api/communitywiki/" + newCommunityId + "/feed")
                        result = await this.apiClient.postXML(xml, url)
                        if (result.ok) {
                            this.loggingService.LogInfo('Wiki Page erstellt.')
                        } else {
                            this.loggingService.LogInfo('Wiki Page erstellen fehlgeschlagen.')
                        }
                    });
                }
                await copyWikiEntries();
            } else {
                this.loggingService.LogInfo('Kopieren von Wikis fehlgeschlagen.')
            }
        }
        return result;
    }

}
