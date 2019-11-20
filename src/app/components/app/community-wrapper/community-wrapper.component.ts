import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Community } from 'src/app/models/community.model';
import { CreateTemplateService, CreateTemplateResult } from 'src/app/services/create-template.service';

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

  constructor(private route: ActivatedRoute,
    private createService: CreateTemplateService) {

    this.commId = this.route.snapshot.params.id;
    this.commLoaded = this.commLoaded.bind(this)
  }

  async startProcess() {
    this.processRunning = true
    this.processResult = await this.createService.create(this.community)
  }

  commLoaded(community: Community) {
    this.community = community;
  }

  ngOnInit() {
  }

}
