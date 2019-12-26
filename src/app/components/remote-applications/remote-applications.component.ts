import { Component, OnInit, Input } from '@angular/core';
import { EntityLink } from 'src/app/common/entity-link';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { RemoteApplicationCollection } from 'src/app/models/remoteapplication-collection.model';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';

@Component({
  selector: 'app-remote-applications',
  templateUrl: './remote-applications.component.html',
  styleUrls: ['./remote-applications.component.sass']
})
export class RemoteApplicationsComponent implements OnInit {

  @Input() remoteApps: EntityLink<RemoteApplicationCollection>;
  @Input() communityId: string;
  
  client: ApiClientService;
  selectedRemoteApplication: EntityLink<RemoteApplication>;

  constructor(private apiClient: ApiClientService) {
  }

  async ngOnInit() {
    await this.loadRemoteApps();
    this.selectedRemoteApplication = this.remoteApps.model.remoteApplications[0].link;
  }

  onSelect(link) {
    this.selectedRemoteApplication = link;
  }

  async loadRemoteApps() {
    await RemoteApplicationCollection.load(this.apiClient, this.remoteApps)
  }

}
