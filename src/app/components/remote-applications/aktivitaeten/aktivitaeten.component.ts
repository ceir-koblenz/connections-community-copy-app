import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { AktivitaetenCollectionXmlParser } from 'src/app/xml-parser/remote-applications/aktivitaeten-colletion-xml-parser';
import { AktivitaetenCollection } from 'src/app/models/remote-applications/aktivitaeten-collection.model';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { EntityLink } from 'src/app/common/entity-link';

@Component({
  selector: 'app-aktivitaeten',
  templateUrl: './aktivitaeten.component.html',
  styleUrls: ['./aktivitaeten.component.sass']
})
export class AktivitaetenComponent implements OnInit {

  @Input() remoteApplication: EntityLink<RemoteApplication>;

  client: ApiClientService;
  Aktivitaeten: AktivitaetenCollection;

  constructor(private apiClient: ApiClientService) {
    this.client = apiClient;
  }

  async ngOnInit() {
    await this.loadWikiFeed();    
  }

  async loadWikiFeed() {
    var xmlString = await this.client.loadXML(this.remoteApplication.url); // Raw XML laden

    var xmlParser: AktivitaetenCollectionXmlParser = new AktivitaetenCollectionXmlParser()
    this.Aktivitaeten = new AktivitaetenCollection();

    xmlParser.fillFromXml(this.Aktivitaeten, xmlString);
  }

}
