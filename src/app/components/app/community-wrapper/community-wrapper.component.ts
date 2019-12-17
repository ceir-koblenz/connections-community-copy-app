import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Community } from 'src/app/models/community.model';
import { CreateTemplateService, CreateTemplateResult } from 'src/app/services/create-template.service';
import { ProcessStatus } from 'src/app/common/process-status';

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
  private processResult: CreateTemplateResult = null;
  private processStatus: ProcessStatus = new ProcessStatus();

  constructor(private route: ActivatedRoute,
    private createService: CreateTemplateService) {

    this.commId = this.route.snapshot.params.id;
    this.commLoaded = this.commLoaded.bind(this);
  }

  async startProcess() {
    this.processRunning = true;
    this.processResult = await this.createService.create(this.community, this.processStatus);

    this.processRunning = false;
  }

  commLoaded(community: Community) {
    this.community = community;
  }

  ngOnInit() {
  }

}
