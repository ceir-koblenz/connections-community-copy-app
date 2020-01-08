import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Community } from 'src/app/models/community.model';
import { CreateTemplateService, CreateTemplateResult } from 'src/app/services/create-template.service';
import { ProcessStatus } from 'src/app/common/process-status';
import { ProcessType, ProcessTypeLabels } from 'src/app/common/process-type';

@Component({
  selector: 'app-community-wrapper',
  templateUrl: './community-wrapper.component.html',
  styleUrls: ['./community-wrapper.component.sass']
})
export class CommunityWrapperComponent implements OnInit {
  public commId: string = null;

  
  /**
   * Macht die verfügbaren ProcessTypes samt labels fürs Dropdown im Frontend verfügbar
   *
   * @memberof CommunityWrapperComponent
   */
  public processTypes = ProcessTypeLabels;
  /**
   * wird später verwendet, um Voreinstellungen bzgl. des Kopierens von Community-Teilelementen festzulegen
   */
  public selectedProcessType: ProcessType = ProcessType.createTemplate;
  /**
   * Die gerade geöffnete Community
   *
   * @private
   * @type {Community}
   * @memberof CommunityWrapperComponent
   */
  private community: Community = null;
  /**
   * Flag, welches beschreibt, ob gerade ein Prozess (kopieren der community...) läuft
   *
   * @type {boolean}
   * @memberof CommunityWrapperComponent
   */
  public processRunning: boolean = false;
  public processResult: CreateTemplateResult = null;
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
