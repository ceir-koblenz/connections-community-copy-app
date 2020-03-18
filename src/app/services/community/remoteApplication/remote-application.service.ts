import { Injectable } from '@angular/core';
import { ApiClientService } from '../../api-client/api-client.service';
import { EntityLink } from 'src/app/common/entity-link';
import { RemoteApplicationCollection } from 'src/app/models/remoteapplication-collection.model';
import { RemoteApplicationCollectionXmlParser } from 'src/app/xml-parser/remoteapplicationcollection-xml-parser';

@Injectable({
  providedIn: 'root'
})
export class RemoteApplicationService {

  // Apps die mit Inhalt kopiert werden können
  supportedRemoteApps: Array<String> = [
    'Files',
    'Dateien',
    'Forums',
    'Foren',
    'Wiki',
    'Aktivitäten',
    'Activities',
    'Blog',
    'Forum'
  ] //TODO: was ist mit anderen Sprache außer Deutsch & Englisch?

  constructor(private client: ApiClientService) { }

  async loadCollection(link: EntityLink<RemoteApplicationCollection>): Promise<RemoteApplicationCollection> {
    var xmlParser = new RemoteApplicationCollectionXmlParser()
    var result = new RemoteApplicationCollection();

    var nextPageLink: URL = link.url;

    do {
      var currentXml = await this.client.loadXML(nextPageLink)
      nextPageLink = xmlParser.getNextPageUrl(currentXml)
      xmlParser.fillFromXml(result, currentXml)  // RemoteApplicationCollection Instanz anhand des XMLs befüllen
    } while (nextPageLink !== null);

    link.model = result;

    return result;
  }

  async removeUnsupportedApps(collection: RemoteApplicationCollection) {
    var remoteApp = collection.remoteApplications;
    for (let index = 0; index < remoteApp.length; index++) {
      if (!this.supportedRemoteApps.includes(remoteApp[index].title)) {
        remoteApp.splice(index, 1);
        index--;
      }
    }
  }
}
