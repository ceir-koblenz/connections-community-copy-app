import { Injectable } from '@angular/core';
import { ApiClientService } from '../api-client/api-client.service';
import { LoggingService } from '../logging/logging.service';
import { LayoutCollection } from 'src/app/models/layout-collection.model';
import { EntityLink } from 'src/app/common/entity-link';
import { LayoutCollectionXmlParser } from 'src/app/xml-parser/layoutcollection-xml-parser';
import { LayoutXmlWriter } from './layout-xml-writer';
import { getConfig } from 'src/app/app-config';

/**
 * Service für das Laden und Posten von Layouts
 *
 * @export
 * @class LayoutService
 */
@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    /**
     *Creates an instance of LayoutService.
     * @param {ApiClientService} apiClient
     * @param {LoggingService} loggingService
     * @memberof LayoutService
     */
    constructor(private apiClient: ApiClientService,
        private loggingService: LoggingService) { }

    /**
     * Lädt die Layouts anhand des übergebenen EntityLinks und gibt sie zurück
     *
     * @param {EntityLink<LayoutCollection>} link EntityLink, der auf die zu ladende LayoutCollection zeigt
     * @returns {Promise<LayoutCollection>} geladene LayoutCollection
     * @memberof LayoutService
     */
    async loadCollection(link: EntityLink<LayoutCollection>): Promise<LayoutCollection> {
        var xmlString = await this.apiClient.loadXML(link.url); // Raw XML laden

        var xmlParser: LayoutCollectionXmlParser = new LayoutCollectionXmlParser()
        var result = new LayoutCollection();

        xmlParser.fillFromXml(result, xmlString);
        link.model = result;

        return result;
    }

    /**
     * Erstellt die übergebenen Layouts in der Community der übergebenen Id
     *
     * @param {String} commId Community, in welcher die Layouts erstellt werden sollen
     * @param {LayoutCollection} layouts Layouts, die gepostet werden sollen
     * @returns {Promise<Boolean>} Flag, welches beschreibt, ob alle Layouts erfolgreich erstellt wurden oder nicht.
     * @memberof LayoutService
     */
    async createCollection(commId: String, layouts: LayoutCollection): Promise<Boolean> {
        this.loggingService.LogInfo('Übertrage Layout...')
        var allLayoutsSucceeded = true;
        var writer = new LayoutXmlWriter()

        for (let index = 0; index < layouts.layouts.length; index++) {
            const layout = layouts.layouts[index];

            let xml = writer.toXmlString(layout)
            let url = this.getCreatePath(commId, layout.pageId);

            let result = await this.apiClient.putXML(xml, url)
            if (!result.ok) {
                allLayoutsSucceeded = false;
                this.loggingService.LogError('Anpassen des Layouts fehlgeschlagen...')
            }
        }

        return allLayoutsSucceeded;
    }

    /**
     * Ermittelt den Pfad, unter welchem das Layout einer bestimmten Page in einer bestimmten Community gepostet werden kann
     *
     * @private
     * @param {String} commId Id der Zielcommunity
     * @param {String} pageId Id der Page des zu postenden Layouts
     * @returns {URL}
     * @memberof LayoutService
     */
    private getCreatePath(commId: String, pageId: String): URL {
        var basePath = getConfig().connectionsUrl
        return new URL(`${basePath}/communities/service/atom/community/page?communityUuid=${commId}&pageId=${pageId}`)
    }
}