import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { BlogCollectionXmlParser } from 'src/app/xml-parser/remote-applications/blog-collection-xml-parser';
import { BlogCollection } from 'src/app/models/remote-applications/blog-collection.model';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { EntityLink } from 'src/app/common/entity-link';
import { BlogService } from 'src/app/services/community/blog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent implements OnInit {

  @Input() remoteApplication: EntityLink<RemoteApplication>;
  @Input() communityId: string;

  client: ApiClientService;
  blogs: BlogCollection;
  copyAll: boolean = false;
  
  constructor(private apiClient: ApiClientService, private blogService: BlogService) {
    this.client = apiClient;
  }

  async ngOnInit() {
    await this.loadBlogFeed();
  }

  async loadBlogFeed() {
    this.blogs = await this.blogService.load(this.remoteApplication, this.communityId);
  }

  setShouldCopyAll() {
    this.copyAll = !this.copyAll;
    // Iterate through all blogs and update shouldCopy variable
    this.blogs.blogs.forEach(blog => {
      blog.shouldCopy = this.copyAll;
    });
  }

  setShouldCopy(blog) {
    blog.shouldCopy = !blog.shouldCopy;
  }

}
