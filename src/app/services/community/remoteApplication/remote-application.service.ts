import { Injectable } from '@angular/core';
import { ApiClientService } from '../../api-client/api-client.service';
import { EntityLink } from 'src/app/common/entity-link';
import { RemoteApplicationCollection } from 'src/app/models/remoteapplication-collection.model';
import { RemoteApplicationCollectionXmlParser } from 'src/app/xml-parser/remoteapplicationcollection-xml-parser';

@Injectable({
  providedIn: 'root'
})
export class RemoteApplicationService {

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
}
