import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { BlogCollectionXmlParser } from 'src/app/xml-parser/remote-applications/blog-collection-xml-parser';
import { BlogCollection } from 'src/app/models/remote-applications/blog-collection.model';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { EntityLink } from 'src/app/common/entity-link';
import { BlogService } from 'src/app/services/community/blog/blog.service';
import { ProcessTypeService } from 'src/app/services/process-type.service';
import { ProcessType } from 'src/app/common/process-type';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent implements OnInit {

  @Input() remoteApplication: EntityLink<RemoteApplication>;
  @Input() communityId: string;

  blogs: BlogCollection;
  copyAll: boolean = false;

  constructor(private blogService: BlogService,
    private processTypeService: ProcessTypeService) { }

  async ngOnInit() {
    this.blogs = await this.blogService.load(this.remoteApplication, this.communityId);

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

  toggleShouldCopyAll() {
    this.copyAll = !this.copyAll;
    this._setShouldCopyAll();
  }

  toggleShouldCopy(blog) {
    blog.shouldCopy = !blog.shouldCopy;
  }

  _setShouldCopyAll() {
    // Iterate through all blogs and update shouldCopy variable
    this.blogs.blogs.forEach(blog => {
      blog.shouldCopy = this.copyAll;
    });
  }
}
