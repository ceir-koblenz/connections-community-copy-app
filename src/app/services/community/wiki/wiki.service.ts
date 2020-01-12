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
import { WikiXmlParser } from 'src/app/xml-parser/remote-applications/wiki-xml-parser';

@Injectable({
    providedIn: 'root'
})
export class WikiService {

    constructor(private apiClient: ApiClientService,
        private loggingService: LoggingService) { }

    async load(entity: EntityLink<RemoteApplication>): Promise<WikiCollection> {

        /**
         * Um die Child-Pages von Wikis zu ermitteln muss zunächst eine JSON geladen werden,
         * die die Navigation des Wikis beinhaltet. Darin enthalten sind zu jeder Wiki-Page
         * Parent ID und Child IDs (https://bastide.org/2014/05/06/creating-a-new-wiki-page-as-a-child/). 
         * * Step 1: Wir speichern zu jeder Wiki-Page in einem key (page-id) value (parent-id) peer array 
         *           die Verknüpfung aus der JSON.
         * * Step 2: Wir laden die Wiki Pages und erstellen eine WikiCollection die ein Array aus Wikis beinhaltet.
         * * Step 3: Beim Laden werden die Wiki-Models geparst, danach wird für jedes Wiki geprüft, 
         *           ob es einen Parent (diese Info wird aus dem JSON entnommen) hat und dieser wird, 
         *           falls vorhanden, hinzugefügt.
         * * Step 4: Beim Create einer Wiki-Page muss die neue uuid geparst werden. Im betroffenen Child wird dann
         *           die neue uuid durch die alte ersetzt.
         * * Step 5: Beim Create wird im WikiXmlParser ein parent hinzugefügt sofern vorhanden 
         *           (http://www.ebasso.net/wiki/index.php?title=IBM_Connections:_Using_Connections_API_on_Wiki_Pages).
         */


        var xmlParser: WikiCollectionXmlParser = new WikiCollectionXmlParser();
        var wikis = new WikiCollection();

        var nextPageLink: URL = entity.url;

        do {
            var currentXml = await this.apiClient.loadXML(nextPageLink)
            nextPageLink = xmlParser.getNextPageUrlHack(entity.url, currentXml)
            xmlParser.fillFromXml(wikis, currentXml)  // RemoteApplicationCollection Instanz anhand des XMLs befüllen
        } while (nextPageLink !== null);

        // Load navigation json of the wiki
        var wikiNavLink: string = getConfig().connectionsUrl + "/wikis/basic/api/wiki/" + wikis.id + "/navigation/feed"
        var wikiNavJSON = await this.apiClient.loadJSON(new URL(wikiNavLink));
        // Set parents in wiki models

        await asyncForEach(wikis.wikis, async (wiki: Wiki) => {
            await asyncForEach(wikiNavJSON, async (element: any) => {
                if (element.parent !== null && wiki.uUid === element.id) {
                    for (let index = 0; index < wikis.wikis.length; index++) {
                        if (wikis.wikis[index].uUid === element.parent) {
                            wiki.parent = wikis.wikis[index];
                            break;
                        }
                    }
                }
            });
        });

        // wiki ist erst dann vollständig geladen, wenn auch der Content geladen ist
        const loadWikiContent = async () => {
            await asyncForEach(wikis.wikis, async (wiki: Wiki) => {
                await Wiki.loadContentXml(this.apiClient, wiki);
            })
        }
        await loadWikiContent();

        entity.model = wikis;
        return wikis;
    }

    async create(newCommunityId: string, wikiCollection: WikiCollection): Promise<HttpResponse<any>> {
        var result: HttpResponse<any>;
        var wikis: Array<Wiki> = wikiCollection.wikis;

        if (wikis.length > 0) {
            this.loggingService.LogInfo('Start kopieren von Wikis.');
            // Create a new wiki widget
            var widgetWriter = new WidgetXmlWriter();
            var xml = widgetWriter.toXmlString("Wiki");
            var url = new URL(getConfig().connectionsUrl + "/communities/service/atom/community/widgets?communityUuid=" + newCommunityId);
            result = await this.apiClient.postXML(xml, url);
            if (result.ok) {
                this.loggingService.LogInfo('Wiki Widget erstellt.')
                // Create entries/pages
                const copyWikiEntries = async () => {
                    await asyncForEach(wikis, async (wiki: Wiki) => {
                        if (wiki.shouldCopy) {
                            await this.createWiki(wiki, newCommunityId);
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

    private async createWiki(wiki: Wiki, newCommunityId: string): Promise<HttpResponse<any>> {
        if (!wiki.shouldCopy) { 
            return; // Abbruchbedinung 
        }

        var result: HttpResponse<any>;
        var wikiWriter: WikiXmlWriter = new WikiXmlWriter()
        var xml = wikiWriter.toXmlString(wiki)
        var url = new URL(getConfig().connectionsUrl + "/wikis/basic/api/communitywiki/" + newCommunityId + "/feed")

        result = await this.apiClient.postXML(xml, url)
        if (result.ok) {
            this.loggingService.LogInfo('Wiki Page erstellt.');
            if (wiki.childWikis.length === 0) {
                return; // Abbruchbedingung
            } else {
                // Get new uuid of the wiki page and set it for direct childs
                var wikiParser = new WikiXmlParser();
                var newWiki = new Wiki();
                wikiParser.fillFromXml(newWiki, result.body);
                // Child Wikis rekursiv aufrufen und erstellen
                await asyncForEach(wiki.childWikis, async (tWiki: Wiki) => {
                    tWiki.parent = newWiki;
                    await this.createWiki(tWiki, newCommunityId);
                });
            }
        } else {
            this.loggingService.LogInfo('Wiki Page erstellen fehlgeschlagen.');
        }

        return result;
    }

}
