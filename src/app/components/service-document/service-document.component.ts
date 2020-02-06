import { Component, OnInit } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { getConfig } from './../../app-config';
import { ServiceDocument } from 'src/app/models/service-document.model';
import { EntityLink } from 'src/app/common/entity-link';
import { CommunityCollection } from 'src/app/models/community-collection.model';



@Component({
  selector: 'app-service-document',
  templateUrl: './service-document.component.html',
  styleUrls: ['./service-document.component.css']
})
export class ServiceDocumentComponent implements OnInit {

  serviceDoc: ServiceDocument;
  allCommunityCollection: EntityLink<CommunityCollection>;
  myCommunityCollection: EntityLink<CommunityCollection>;

  constructor(private apiClient: ApiClientService) {
  }

  async ngOnInit() {
    var apiUrl = getConfig().connectionsUrl;

    // einzige Komponente, bei der die Url zusammengebaut werden muss, alles andere
    // ergibt sich aus den Links.
    var serviceDocUrl = new URL(apiUrl + "communities/service/atom/service")
    this.serviceDoc = await ServiceDocument.load(this.apiClient, serviceDocUrl)

    this.allCommunityCollection = this.serviceDoc.allCommunitiesLink;
    this.myCommunityCollection = this.serviceDoc.myCommunitiesLink;

  }

}
