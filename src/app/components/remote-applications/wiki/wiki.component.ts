import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { WikiCollectionXmlParser } from 'src/app/xml-parser/remote-applications/wiki-collection-xml-parser';
import { WikiCollection } from 'src/app/models/remote-applications/wiki-collection.model';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { EntityLink } from 'src/app/common/entity-link';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.sass']
})
export class WikiComponent implements OnInit {

  @Input() remoteApplication: EntityLink<RemoteApplication>;

  client: ApiClientService;
  wikis: WikiCollection;

  constructor(private apiClient: ApiClientService) {
    this.client = apiClient;
  }

  async ngOnInit() {
    await this.loadWikiFeed();
  }

  async loadWikiFeed() {
    var xmlString = await this.client.loadXML(this.remoteApplication.url); // Raw XML laden

    var xmlParser: WikiCollectionXmlParser = new WikiCollectionXmlParser()
    this.wikis = new WikiCollection();

    var nextPageLink: URL = this.remoteApplication.url;

    do {
      var currentXml = await this.client.loadXML(nextPageLink)
      nextPageLink = xmlParser.getNextPageUrl(this.remoteApplication.url, currentXml)
      xmlParser.fillFromXml(this.wikis, currentXml)  // RemoteApplicationCollection Instanz anhand des XMLs befüllen
    } while (nextPageLink !== null);

  }

}
