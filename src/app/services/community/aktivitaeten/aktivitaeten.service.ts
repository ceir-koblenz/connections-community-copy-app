import { Injectable } from '@angular/core';
import { Aktivitaet } from 'src/app/models/remote-applications/aktivitaeten.model';
import { AktivitaetenCollectionXmlParser } from 'src/app/xml-parser/remote-applications/aktivitaeten-collection-xml-parser';
import { EntityLink } from 'src/app/common/entity-link';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { asyncForEach } from 'src/app/common/async-foreach';
import { ApiClientService } from '../../api-client/api-client.service';
import { LoggingService } from '../../logging/logging.service';
import { AktivitaetenXmlWriter } from './aktivitaeten-xml-writer';
import { getConfig } from 'src/app/app-config';
import { HttpResponse } from '@angular/common/http';
import { AktivitaetenCollection } from 'src/app/models/remote-applications/aktivitaeten-collection.model';
import { WidgetXmlWriter } from '../widget/widget-xml-writer';
import { WidgetService } from '../widget/widget.service';


@Injectable({
    providedIn: 'root'
})
export class AktivitaetenService {

    constructor(private apiClient: ApiClientService,
        private loggingService: LoggingService,
        private widgetService: WidgetService) { }

    async load(entity: EntityLink<RemoteApplication>): Promise<AktivitaetenCollection> {
        var xmlParser: AktivitaetenCollectionXmlParser = new AktivitaetenCollectionXmlParser();
        var aktivitaeten = new AktivitaetenCollection();

        var url: URL = entity.url;

        var currentXml = await this.apiClient.loadXML(url)
        xmlParser.fillFromXml(aktivitaeten, currentXml)  // RemoteApplicationCollection Instanz anhand des XMLs befüllen

        entity.model = aktivitaeten;
        return aktivitaeten;
    }

    async create(newCommunityId: string, aktivitaetenCollection: AktivitaetenCollection):Promise<HttpResponse<any>> {
        var result: HttpResponse<any>;
        var aktivitaetenToCopy: Array<Aktivitaet> = new Array<Aktivitaet>();
        const getAktivitaetenToCopy = async () => {
            await asyncForEach(aktivitaetenCollection.aktivitaeten, async (aktivitaet:Aktivitaet) => {
                if (aktivitaet.shouldCopy) {
                    aktivitaetenToCopy.push(aktivitaet);
                }
            });
        }
        await getAktivitaetenToCopy();

        if (aktivitaetenToCopy.length > 0) {
            this.loggingService.LogInfo('Start kopieren von Aktivitäten.')
            // Create a new wiki widget
            result = await this.widgetService.createWidget(newCommunityId, "Aktivitäten");
            if (result && result.ok) {
                this.loggingService.LogInfo('Aktivitäten Widget erstellt.')
            } else {
                this.loggingService.LogInfo('Erstellung Aktivitäten Widget fehlgeschlagen.')
            }
            if (aktivitaetenToCopy.length > 0) {
                this.loggingService.LogInfo('Aktivitäten Widget erstellt.')
                // Create entries/pages
                var aktivitaetenWriter = new AktivitaetenXmlWriter()
                const copyAktivitaeten = async () => {
                    await asyncForEach(aktivitaetenToCopy, async (aktivitaet) => {
                        var xml = aktivitaetenWriter.toXmlString(aktivitaet)
                        var url = new URL(getConfig().connectionsUrl + "/activities/service/atom2/activities?commUuid=" + newCommunityId +"&public=yes&authenticate=no")
                        result = await this.apiClient.postXML(xml, url)
                        if (result.ok) {
                            this.loggingService.LogInfo('Aktivität erstellt.')
                        } else {
                            this.loggingService.LogInfo('Aktivität erstellen fehlgeschlagen.')
                        }
                    });
                }
                await copyAktivitaeten();
            }
        }
        return result;
    }

}
