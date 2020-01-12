import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { WikiCollection } from 'src/app/models/remote-applications/wiki-collection.model';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { EntityLink } from 'src/app/common/entity-link';
import { WikiService } from 'src/app/services/community/wiki/wiki.service';
import { Wiki } from 'src/app/models/remote-applications/wiki.model';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.sass']
})
export class WikiComponent implements OnInit {

  @Input() remoteApplication: EntityLink<RemoteApplication>;

  client: ApiClientService;
  wikis: WikiCollection;
  copyAll: boolean = false;

  constructor(private apiClient: ApiClientService, private wikiService: WikiService) {
    this.client = apiClient;
  }

  async ngOnInit() {
    await this.loadWikiFeed();
    this.remoteApplication.model.shouldCopy = true; //TODO: nur für Processbar test! Issue #56 soll das steuern!
  }

  async loadWikiFeed() {
    this.wikis = await this.wikiService.load(this.remoteApplication);
    await Wiki.sortWikis(this.wikis.wikis);
  }

  setShouldCopyAll() {
    this.copyAll = !this.copyAll;
    // Iterate through all wikis and update shouldCopy variable
    this.wikis.wikis.forEach(wiki => {
      wiki.shouldCopy = this.copyAll;
    });
  }

  setShouldCopy(wiki) {
    wiki.shouldCopy = !wiki.shouldCopy;
  }

}
