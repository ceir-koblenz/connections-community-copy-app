import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { getConfig } from './../../app-config';
import { Community } from 'src/app/models/community.model';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.sass']
})
export class CommunityComponent implements OnInit {
  @Input() commId: string = null;
  @Input() commLoaded: (x: Community) => void = null
  private community: Community = null;

  constructor(private apiClient: ApiClientService
  ) { }

  async ngOnInit() {
    var apiUrl = getConfig().connectionsUrl;
    var commUrl = new URL(apiUrl + "/communities/service/atom/community/instance?communityUuid=" + this.commId);
    this.community = await Community.load(this.apiClient, commUrl);
    if (this.community) {
      this.commLoaded(this.community)
    }
  }
}

