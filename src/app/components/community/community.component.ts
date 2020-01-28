import { Component, OnInit, Input } from '@angular/core';
import { getConfig } from './../../app-config';
import { Community } from 'src/app/models/community.model';
import { CommunityService } from 'src/app/services/community/community.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.sass']
})
export class CommunityComponent implements OnInit {
  /**
   * die Id der anzuzeigenden Community
   *
   * @type {string}
   * @memberof CommunityComponent
   */
  @Input() commId: string = null;
  /**
   * Callback-Funktion für das Ereignis, dass die Community geladen wurde.
   *
   * @memberof CommunityComponent
   */
  @Input() commLoaded: (x: Community) => void = null
  /**
   * Die anzuzeigende Community; ist Null bis sie von der API geladen wird.
   *
   * @private
   * @type {Community}
   * @memberof CommunityComponent
   */
  private community: Community = null;

  /**
   *Creates an instance of CommunityComponent.
   * @param {CommunityService} commService
   * @memberof CommunityComponent
   */
  constructor(private commService: CommunityService) { }

  /**
   * Initialisierungslogik der Komponente; Lädt die Community anhand des Id-Parameters.
   *
   * @memberof CommunityComponent
   */
  async ngOnInit() {
    this.community = await this.commService.loadById(this.commId);
    if (this.community) {
      // Default-Communitytitel mit Suffix setzen
      this.community.title += " - Copy"
      this.commLoaded(this.community)
    }
  }

}

