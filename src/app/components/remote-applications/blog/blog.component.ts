import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { BlogXmlParser } from 'src/app/xml-parser/remote-applications/blog-xml-parser';
import { Blog } from 'src/app/models/remote-applications/blog.model';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { EntityLink } from 'src/app/common/entity-link';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent implements OnInit {

  @Input() remoteApplication: EntityLink<RemoteApplication>;

  client: ApiClientService;
  blog: Blog;

  
  constructor(private apiClient: ApiClientService) {
    this.client = apiClient;
  }

  async ngOnInit() {
    await this.loadBlogFeed();
  }

  async loadBlogFeed() {

    var xmlParser: BlogXmlParser = new BlogXmlParser();
    this.blog = new Blog();

    var nextPageLink: URL = this.remoteApplication.url;

    do {
      var currentXml = await this.client.loadXML(nextPageLink)
      nextPageLink = xmlParser.getNextPageUrlHack(this.remoteApplication.url, currentXml)
      xmlParser.fillFromXml(this.blog, currentXml)  // RemoteApplicationCollection Instanz anhand des XMLs befüllen
    } while (nextPageLink !== null);

  }

}


