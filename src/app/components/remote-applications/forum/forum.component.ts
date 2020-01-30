import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { ForumCollection } from 'src/app/models/remote-applications/forum-collection.model';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { EntityLink } from 'src/app/common/entity-link';
import { ForumService } from 'src/app/services/community/forum/forum.service';
import { Forum } from 'src/app/models/remote-applications/forum.model';
import { ProcessTypeService } from 'src/app/services/process-type.service';
import { ProcessType } from 'src/app/common/process-type';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  @Input() remoteApplication: EntityLink<RemoteApplication>;
  @Input() communityId: string;

  client: ApiClientService;
  foren: ForumCollection;
  copyAll: boolean = false;

  constructor(private apiClient: ApiClientService, private forumService: ForumService, private processTypeService: ProcessTypeService) {
    this.client = apiClient;
  }

  async ngOnInit() {
    await this.loadForumFeed();

    this.processTypeService.getProcessType().subscribe(x => {
      var doCopy = false;
      if (x === ProcessType.copy) {
        doCopy = true;
      } else if (x === ProcessType.createTemplate) {
        doCopy = false;
      }
      this.copyAll = doCopy;
      this._setShouldCopyAll();
    });

  }

  async loadForumFeed() {
    this.foren = await this.forumService.load(this.remoteApplication, this.communityId);
  }

  toggleShouldCopyAll() {
    this.copyAll = !this.copyAll;
    // Iterate through all wikis and update shouldCopy variable
    this.foren.foren.forEach((forum:Forum) => {
      forum.shouldCopy = this.copyAll;
    });
  }

  toggleShouldCopy(forum:Forum) {
    forum.shouldCopy = !forum.shouldCopy;
  }

  _setShouldCopyAll() {
    // Iterate through all blogs and update shouldCopy variable
    this.foren.foren.forEach((forum:Forum) => {
      forum.shouldCopy = this.copyAll;
    });
  }

}
