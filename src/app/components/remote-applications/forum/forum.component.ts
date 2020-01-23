import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { ForumCollection } from 'src/app/models/remote-applications/forum-collection.model';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { EntityLink } from 'src/app/common/entity-link';
import { ForumService } from 'src/app/services/community/forum/forum.service';
import { Forum } from 'src/app/models/remote-applications/forum.model';

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

  constructor(private apiClient: ApiClientService, private forumService: ForumService) {
    this.client = apiClient;
  }

  async ngOnInit() {
    await this.loadForumFeed();
  }

  async loadForumFeed() {
    this.foren = await this.forumService.load(this.remoteApplication, this.communityId);
  }

  setShouldCopyAll() {
    this.copyAll = !this.copyAll;
    // Iterate through all wikis and update shouldCopy variable
    this.foren.foren.forEach((forum:Forum) => {
      forum.shouldCopy = this.copyAll;
    });
  }

  setShouldCopy(forum:Forum) {
    forum.shouldCopy = !forum.shouldCopy;
  }

}
