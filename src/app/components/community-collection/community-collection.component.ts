import { Component, OnInit, Input } from '@angular/core';
import { CommunityCollection } from 'src/app/models/community-collection.model';
import { EntityLink } from 'src/app/common/entity-link';
import { CommunityService } from 'src/app/services/community/community.service';

/**
 * Komponente zum Anzeigen einer Community-Collection
 *
 * @export
 * @class CommunityCollectionComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-community-collection',
  templateUrl: './community-collection.component.html',
  styleUrls: ['./community-collection.component.css']
})
export class CommunityCollectionComponent implements OnInit {
  /**
   * Größe einer Page für das gepagete Darstellen von Communities
   *
   * @type {number}
   * @memberof CommunityCollectionComponent
   */
  public pageSize: number = 10;
  /**
   * Die aktuell anzuzeigende Page
   *
   * @type {number}
   * @memberof CommunityCollectionComponent
   */
  public page: number = 1;

  /**
   * EntityLink, welcher auf die anzuzeigende Communitycollection verweist.
   *
   * @memberof CommunityCollectionComponent
   */
  @Input() collection: EntityLink<CommunityCollection>

  /**
   *Creates an instance of CommunityCollectionComponent.
   * @param {CommunityService} communityService
   * @memberof CommunityCollectionComponent
   */
  constructor(private communityService: CommunityService) { }

  /**
   * Initialisierungslogik der Komponente; Lädt die Collection anhand des EntityLinks.
   *
   * @memberof CommunityCollectionComponent
   */
  ngOnInit() {
    this.communityService.loadCollection(this.collection);
  }

}
