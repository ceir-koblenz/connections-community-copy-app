import { Injectable } from '@angular/core';
import { BlogCollection } from 'src/app/models/remote-applications/blog-collection.model';
import { Blog } from 'src/app/models/remote-applications/blog.model';
import { BlogCollectionXmlParser } from 'src/app/xml-parser/remote-applications/blog-collection-xml-parser';
import { EntityLink } from 'src/app/common/entity-link';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { asyncForEach } from 'src/app/common/async-foreach';
import { ApiClientService } from '../../api-client/api-client.service';
import { LoggingService } from '../../logging/logging.service';
import { getConfig } from 'src/app/app-config';
import { WidgetXmlWriter } from '../widget-xml-writer';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor(private apiClient: ApiClientService,
        private loggingService: LoggingService) { }

    async load(entity: EntityLink<RemoteApplication>): Promise<BlogCollection> {
        var xmlParser: BlogCollectionXmlParser = new BlogCollectionXmlParser();
        var blogs = new BlogCollection();

        var nextPageLink: URL = entity.url;

        do {
            var currentXml = await this.apiClient.loadXML(nextPageLink)
            nextPageLink = xmlParser.getNextPageUrl(entity.url, currentXml)
            xmlParser.fillFromXml(blogs, currentXml)  // RemoteApplicationCollection Instanz anhand des XMLs befüllen
        } while (nextPageLink !== null);

        
        const loadBlogContent = async () => {
            await asyncForEach(blogs.blogs, async (blog) => {
                await Blog.loadContentXml(this.apiClient, blog);
            })
        }
        await loadBlogContent();

        entity.model = blogs;
        return blogs;
    }
}