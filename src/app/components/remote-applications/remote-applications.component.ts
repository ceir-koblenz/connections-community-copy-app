import { Component, OnInit, Input } from '@angular/core';
import { EntityLink } from 'src/app/common/entity-link';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { RemoteApplicationCollectionXmlParser } from 'src/app/xml-parser/remoteapplicationcollection-xml-parser';
import { RemoteApplicationCollection } from 'src/app/models/remoteapplication-collection.model';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';

@Component({
  selector: 'app-remote-applications',
  templateUrl: './remote-applications.component.html',
  styleUrls: ['./remote-applications.component.sass']
})
export class RemoteApplicationsComponent implements OnInit {

  @Input() remoteApps: EntityLink<RemoteApplicationCollection>;

  client: ApiClientService;
  remoteApplications: RemoteApplicationCollection;
  selectedRemoteApplication: EntityLink<RemoteApplication>;

  constructor(private apiClient: ApiClientService) {
    this.client = apiClient
  }

  ngOnInit() {
    this.loadRemoteApps();
  }

  onSelect(link) {    
    this.selectedRemoteApplication = link;
    console.log(this.selectedRemoteApplication);
    //TODO: create new component per application type 
  }

  async loadRemoteApps() {
    var xmlString = await this.client.loadXML(this.remoteApps.url); // Raw XML laden

    var xmlParser: RemoteApplicationCollectionXmlParser = new RemoteApplicationCollectionXmlParser()
    this.remoteApplications = new RemoteApplicationCollection;

    xmlParser.fillFromXml(this.remoteApplications, xmlString);
  }

}
