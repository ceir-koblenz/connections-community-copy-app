import { Component, OnInit, Input } from '@angular/core';
import { CommunityCollection } from 'src/app/models/community-collection.model';
import { EntityLink } from 'src/app/helpers/entity-link';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { Community } from 'src/app/models/community.model';


@Component({
  selector: 'app-community-collection',
  templateUrl: './community-collection.component.html',
  styleUrls: ['./community-collection.component.sass']
})
export class CommunityCollectionComponent implements OnInit {
  private _collection: EntityLink<CommunityCollection>;
  private selectedCommunity: EntityLink<Community>;

  /**
   * Setter-Funktion, um bei geändertem Input das Community-Feed lazy Laden zu können.
   *
   * @memberof CommunityCollectionComponent
   */
  @Input() set collection(value: EntityLink<CommunityCollection>) {
    if(this._collection != value){
      this._collection = value;
      if (!value.entityLoaded()) {
        CommunityCollection.load(this.apiClient, value);
      }
      this.selectedCommunity = null;
    }
  }

  get collection(): EntityLink<CommunityCollection> {
    return this._collection;
  }

  constructor(private apiClient: ApiClientService) { }

  onSelect(link: EntityLink<Community>) {
    this.selectedCommunity = link;

  }

  ngOnInit() {
  }

}
