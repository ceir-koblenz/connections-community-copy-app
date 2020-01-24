import { Component, OnInit, Input } from '@angular/core';
import { WikiCollection } from 'src/app/models/remote-applications/wiki-collection.model';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { EntityLink } from 'src/app/common/entity-link';
import { WikiService } from 'src/app/services/community/wiki/wiki.service';
import { Wiki } from 'src/app/models/remote-applications/wiki.model';
import { ProcessTypeService } from 'src/app/services/process-type.service';
import { ProcessType } from 'src/app/common/process-type';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.sass']
})
export class WikiComponent implements OnInit {

  @Input() remoteApplication: EntityLink<RemoteApplication>;

  wikis: WikiCollection;

  constructor(private wikiService: WikiService, private processTypeService: ProcessTypeService) { }

  async ngOnInit() {
    await this.loadWikiFeed();
  }

  async loadWikiFeed() {
    this.wikis = await this.wikiService.load(this.remoteApplication);
    await Wiki.sortWikis(this.wikis.wikis);

    this.processTypeService.getProcessType().subscribe(x => {
      var doCopy = false;
      if (x === ProcessType.copy) {
        doCopy = true;
      } else if (x === ProcessType.createTemplate) {
        doCopy = false;
      }
      this.setShouldCopyForAll(doCopy);
    });
  }

  setShouldCopyForAll(copy: boolean) {
    // Iterate through all wikis and update shouldCopy variable
    this.wikis.wikis.forEach((wiki: Wiki) => {
      wiki.shouldCopy = copy;
      Wiki.markChilds(wiki, copy, true);
    });
  }

  toggleShouldCopy(wiki: Wiki) {
    wiki.shouldCopy = !wiki.shouldCopy;
  }

}
