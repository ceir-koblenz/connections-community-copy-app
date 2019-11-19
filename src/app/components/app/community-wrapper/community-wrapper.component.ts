import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Community } from 'src/app/models/community.model';
import { CommunityService } from 'src/app/services/community/community.service';

@Component({
  selector: 'app-community-wrapper',
  templateUrl: './community-wrapper.component.html',
  styleUrls: ['./community-wrapper.component.sass']
})
export class CommunityWrapperComponent implements OnInit {
  private commId: string = null;

  /**
   * wird später verwendet, um Voreinstellungen bzgl. des Kopierens von Community-Teilelementen festzulegen
   */
  private selectedProcessType = null;
  private community: Community = null;
  private processRunning: boolean = false;

  constructor(private route: ActivatedRoute,
    private commService: CommunityService) {

    this.commId = this.route.snapshot.params.id;
    this.commLoaded = this.commLoaded.bind(this)
  }

  async startProcess() {
    this.processRunning = true

    await this.commService.create(this.community)
  }

  commLoaded(community: Community) {
    this.community = community;
  }

  ngOnInit() {
  }

}
