import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { ForumCollection } from 'src/app/models/remote-applications/forum-collection.model';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { EntityLink } from 'src/app/common/entity-link';
import { ForumService } from 'src/app/services/community/forum/forum.service';
import { Forum } from 'src/app/models/remote-applications/forum.model';
import { ProcessTypeService } from 'src/app/services/process-type.service';
import { ProcessType } from 'src/app/common/process-type';
import { asyncForEach } from 'src/app/common/async-foreach';
import { ForumTopicService } from 'src/app/services/community/forum/forumtopic.service';
import { ForumTopic } from 'src/app/models/remote-applications/forumtopic.model';

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
  copyAll = false;

  // tslint:disable-next-line:max-line-length
  constructor(private apiClient: ApiClientService, private forumService: ForumService, private forumTopicService: ForumTopicService, private processTypeService: ProcessTypeService) {
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
    this.foren = await this.forumService.loadForum(this.remoteApplication, this.communityId);

    await asyncForEach(this.foren.foren, async (forum: Forum) => {
      forum.topics = await this.forumTopicService.loadTopic(this.remoteApplication, forum.id);
    });

  }

  toggleShouldCopyAll() {
    this.copyAll = !this.copyAll;
    // Iterate through all forums and associated topics and update shouldCopy variable
    this.foren.foren.forEach((forum: Forum) => {
      forum.shouldCopy = this.copyAll;
      forum.topics.topics.forEach((forumTopic: ForumTopic) => {
        forumTopic.shouldCopy = this.copyAll;
      });
    });
  }

  toggleShouldCopy(forum: Forum) { //used from forums
    forum.shouldCopy = !forum.shouldCopy;
    forum.topics.topics.forEach((forumtopic: ForumTopic) => {
      forumtopic.shouldCopy = forum.shouldCopy;
    });
  }

  async setShouldCopy(forum: Forum, topic: ForumTopic) { // used from topics
    topic.shouldCopy = !topic.shouldCopy;

    // If topic is marked, associated forum has to be marked too
    if (topic.shouldCopy) {
      forum.shouldCopy = true;
    }

  }

  _setShouldCopyAll() {
    // Iterate through all forums and associated topics and update shouldCopy variable
    this.foren.foren.forEach((forum: Forum) => {
      forum.shouldCopy = this.copyAll;
      forum.topics.topics.forEach((forumTopic: ForumTopic) => {
        forumTopic.shouldCopy = this.copyAll;
      });
    });
  }

}
