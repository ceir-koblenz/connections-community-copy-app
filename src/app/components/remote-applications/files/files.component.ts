import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { EntityLink } from 'src/app/common/entity-link';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { FileCollectionXmlParser } from 'src/app/xml-parser/remote-applications/file-collection-xml-parser';
import { FileCollection } from 'src/app/models/remote-applications/file-collection.model';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.sass']
})
export class FilesComponent implements OnInit {

  @Input() remoteApplication: EntityLink<RemoteApplication>;

  client: ApiClientService;
  files: FileCollection;

  constructor(private apiClient: ApiClientService) {
    this.client = apiClient;
  }

  async ngOnInit() {
    await this.loadWikiFeed();
  }

  async loadWikiFeed() {

    var xmlParser: FileCollectionXmlParser = new FileCollectionXmlParser();
    this.files = new FileCollection();

    var nextPageLink: URL = this.remoteApplication.url;

    do {
      var currentXml = await this.client.loadXML(nextPageLink)
      nextPageLink = xmlParser.getNextPageUrl(this.remoteApplication.url, currentXml)
      xmlParser.fillFromXml(this.files, currentXml)  // RemoteApplicationCollection Instanz anhand des XMLs befüllen
    } while (nextPageLink !== null);

  }


}
