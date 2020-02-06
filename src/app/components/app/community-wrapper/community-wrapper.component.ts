import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Community } from 'src/app/models/community.model';
import { CreateTemplateService, CreateTemplateResult } from 'src/app/services/create-template.service';
import { ProcessStatus } from 'src/app/common/process-status';
import { Location } from '@angular/common';

@Component({
  selector: 'app-community-wrapper',
  templateUrl: './community-wrapper.component.html',
  styleUrls: ['./community-wrapper.component.css']
})
export class CommunityWrapperComponent implements OnInit {
  public commId: string = null;

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
    private createService: CreateTemplateService,
    private _location: Location) {

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

  backClicked() {
    this._location.back();
  }

}
