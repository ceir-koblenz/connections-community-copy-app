import { Injectable } from '@angular/core';
import { ApiClientService } from '../api-client/api-client.service';
import { LoggingService } from '../logging/logging.service';
import { LayoutCollection } from 'src/app/models/layout-collection.model';
import { EntityLink } from 'src/app/common/entity-link';
import { LayoutCollectionXmlParser } from 'src/app/xml-parser/layoutcollection-xml-parser';
import { LayoutXmlWriter } from './layout-xml-writer';
import { getConfig } from 'src/app/app-config';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    constructor(private apiClient: ApiClientService,
        private loggingService: LoggingService) { }

    async loadCollection(link: EntityLink<LayoutCollection>): Promise<LayoutCollection> {
        var xmlString = await this.apiClient.loadXML(link.url); // Raw XML laden

        var xmlParser: LayoutCollectionXmlParser = new LayoutCollectionXmlParser()
        var result = new LayoutCollection();

        xmlParser.fillFromXml(result, xmlString);

        return result;
    }

    async createCollection(commId: String, layouts: LayoutCollection): Promise<void> {
        this.loggingService.LogInfo('Übertrage Layout...')

        var writer = new LayoutXmlWriter()

        for (let index = 0; index < layouts.layouts.length; index++) {
            const layout = layouts.layouts[index];

            let xml = writer.toXmlString(layout)
            let url = this.getCreatePath(commId, layout.pageId);

            let result = await this.apiClient.putXML(xml, url)
            if (!result.ok) {
                this.loggingService.LogError('Anpassen des Layouts fehlgeschlagen...')
            }
        }

        return
    }

    private getCreatePath(commId: String, pageId: String): URL {
        var basePath = getConfig().connectionsUrl
        return new URL(`${basePath}/communities/service/atom/community/page?communityUuid=${commId}&pageId=${pageId}`)
    }
}