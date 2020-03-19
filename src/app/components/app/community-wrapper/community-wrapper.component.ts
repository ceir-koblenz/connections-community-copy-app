import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Community } from 'src/app/models/community.model';
import { CreateTemplateService, CreateTemplateResult } from 'src/app/services/create-template.service';
import { ProcessStatus } from 'src/app/common/process-status';
import { Location } from '@angular/common';

/**
 * Wrapper um die Community-Komponente, welche die Funktionen der App (neue Community anlegen..) bereitstellt.
 *
 * @export
 * @class CommunityWrapperComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-community-wrapper',
  templateUrl: './community-wrapper.component.html',
  styleUrls: ['./community-wrapper.component.css']
})
export class CommunityWrapperComponent implements OnInit {
  /**
   * Die Id der Community, die in der gewrappten Komponente angezeigt werden soll.
   *
   * @type {string}
   * @memberof CommunityWrapperComponent
   */
  public commId: string = null;

  /**
   * Die gerade geöffnete Community
   *
   * @private
   * @type {Community}
   * @memberof CommunityWrapperComponent
   */
  community: Community = null;
  /**
   * Flag, welches beschreibt, ob gerade ein Prozess (kopieren der community...) läuft
   *
   * @type {boolean}
   * @memberof CommunityWrapperComponent
   */
  public processRunning: boolean = false;
  /**
   * Ergebnis des Erstellens eines neuen Commmunity.
   *
   * @type {CreateTemplateResult}
   * @memberof CommunityWrapperComponent
   */
  public processResult: CreateTemplateResult = null;
  /**
   * Hält Informationen zum aktuellen Prozessfortschritt
   *
   * @private
   * @type {ProcessStatus}
   * @memberof CommunityWrapperComponent
   */
  processStatus: ProcessStatus = new ProcessStatus();

  /**
   *Creates an instance of CommunityWrapperComponent.
   * @param {ActivatedRoute} route
   * @param {CreateTemplateService} createService
   * @param {Location} _location
   * @memberof CommunityWrapperComponent
   */
  constructor(private route: ActivatedRoute,
    private createService: CreateTemplateService,
    private _location: Location) {

      // Id der anzuzeigenden Community aus Url auslesen
    this.commId = this.route.snapshot.params.id;
    this.commLoaded = this.commLoaded.bind(this);
  }

  /**
   * Startet den Prozess des neu Anlegens einer Community.
   *
   * @memberof CommunityWrapperComponent
   */
  async startProcess() {
    this.processRunning = true;
    this.processResult = await this.createService.create(this.community, this.processStatus);
    this.processRunning = false;
  }

  /**
   * Setzt die übergebene Community als Member.
   *
   * @param {Community} community
   * @memberof CommunityWrapperComponent
   */
  commLoaded(community: Community) {
    this.community = community;
  }

  /**
   * Führt initialisierungslogik durch. 
   *
   * @memberof CommunityWrapperComponent
   */
  ngOnInit(){}
}
