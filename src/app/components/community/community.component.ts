import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { Community } from 'src/app/models/community.model';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.sass']
})
export class CommunityComponent implements OnInit {
  private commId: string = null;
  private community: Community = null;
  private tempLogoUrl: string = null; //TODO remove when regular parsing from xml implemented
  

  constructor(private route: ActivatedRoute,
    private apiClient: ApiClientService,
    private configService: ConfigurationService
  ) {
    this.commId = this.route.snapshot.params.id;
    
  }

  async ngOnInit() {
    var apiUrl = this.configService.getConfig().connectionsUrl;
    var commUrl = new URL(apiUrl + "/communities/service/atom/community/instance?communityUuid=" + this.commId);
    this.tempLogoUrl = "https://c55.bas.uni-koblenz.de/communities/service/html/image?communityUuid=" + this.commId; //TODO remove when parsing from xml implemented
    this.community = await Community.load(this.apiClient, commUrl)
    
  }
}

