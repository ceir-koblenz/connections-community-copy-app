import { Component, OnInit, Input } from '@angular/core';
import { EntityLink } from 'src/app/common/entity-link';
import { RemoteApplicationCollection } from 'src/app/models/remoteapplication-collection.model';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { RemoteApplicationService } from 'src/app/services/community/remoteApplication/remote-application.service';

@Component({
  selector: 'app-remote-applications',
  templateUrl: './remote-applications.component.html',
  styleUrls: ['./remote-applications.component.sass']
})
export class RemoteApplicationsComponent implements OnInit {

  @Input() remoteApps: EntityLink<RemoteApplicationCollection>;
  @Input() communityId: string;
  
  selectedRemoteApplication: EntityLink<RemoteApplication>;

  constructor(private service: RemoteApplicationService) {
  }

  async ngOnInit() {
    await this.loadRemoteApps();
    this.selectedRemoteApplication = this.remoteApps.model.remoteApplications[0].link;
  }

  onSelect(link) {
    this.selectedRemoteApplication = link;
  }

  async loadRemoteApps() {
    await this.service.loadCollection(this.remoteApps)
  }

}
