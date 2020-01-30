import { Injectable } from '@angular/core';
import { BlogCollection } from 'src/app/models/remote-applications/blog-collection.model';
import { Blog } from 'src/app/models/remote-applications/blog.model';
import { BlogCollectionXmlParser } from 'src/app/xml-parser/remote-applications/blog-collection-xml-parser';
import { EntityLink } from 'src/app/common/entity-link';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { asyncForEach } from 'src/app/common/async-foreach';
import { ApiClientService } from '../../api-client/api-client.service';
import { LoggingService } from '../../logging/logging.service';
import { BlogXmlWriter } from './blog-xml-writer';
import { getConfig } from 'src/app/app-config';
import { WidgetXmlWriter } from '../widget/widget-xml-writer';
import { HttpResponse } from '@angular/common/http';
import { BlogXmlParser } from 'src/app/xml-parser/remote-applications/blog-xml-parser';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor(private apiClient: ApiClientService,
        private loggingService: LoggingService) { }

    async load(entity: EntityLink<RemoteApplication>, communityId: string): Promise<BlogCollection> {
        var xmlParser: BlogCollectionXmlParser = new BlogCollectionXmlParser();
        var blogs = new BlogCollection();
        var url = new URL(getConfig().connectionsUrl + "blogs/" + communityId + "/api/entries?ps=10000&amp;lang=de_de");
        var nextPageLink: URL = url;

        do {
            var currentXml = await this.apiClient.loadXML(nextPageLink)
            //nextPageLink = xmlParser.getNextPageUrlHack(url, currentXml)
            nextPageLink = null;
            xmlParser.fillFromXml(blogs, currentXml)  // RemoteApplicationCollection Instanz anhand des XMLs befüllen
        } while (nextPageLink !== null);

        entity.model = blogs;
        return blogs;
    }

    async create(newCommunityId: string, blogCollection: BlogCollection):Promise<HttpResponse<any>> {
        var result: HttpResponse<any>;
        var blogsToCopy: Array<Blog> = new Array<Blog>();
        const getBlogsToCopy = async () => {
            await asyncForEach(blogCollection.blogs, async (blog:Blog) => {
                if (blog.shouldCopy) {
                    blogsToCopy.push(blog);
                }
            });
        }
        await getBlogsToCopy();

        var blogsToCopyReverse: Array<Blog> = new Array<Blog>();
        const getBlogsToCopyReverse = async () => {
            blogsToCopyReverse = blogsToCopy.reverse();
        }
        await getBlogsToCopyReverse();
        
        if (blogsToCopy.length > 0) {
            this.loggingService.LogInfo('Start Kopieren von Blogs.')
            // Create a new blog widget
            var widgetWriter = new WidgetXmlWriter()
            var xml = widgetWriter.toXmlString("Blog")
            var url = new URL(getConfig().connectionsUrl + "/communities/service/atom/community/widgets?communityUuid=" + newCommunityId)
            result = await this.apiClient.postXML(xml, url)
            if (result.ok) {
                this.loggingService.LogInfo('Blog Widget erstellt.')
                // Create entries/pages
                var blogWriter = new BlogXmlWriter()
                const copyBlogEntries = async () => {
                    await asyncForEach(blogsToCopy, async (blog: Blog) => {
                        var xml = blogWriter.toXmlString(blog)
                        
                        url = new URL(getConfig().connectionsUrl + "blogs/" + newCommunityId + "/api/entries?Content-Type=application/atom+xml")
                        result = await this.apiClient.postXML(xml, url)
                        if (result.ok) {
                            this.loggingService.LogInfo('Blog Page erstellt.')
                        } else {
                            this.loggingService.LogInfo('Blog Page erstellen fehlgeschlagen.')
                        }
                    });
                }
                await copyBlogEntries();
            } else {
                this.loggingService.LogInfo('Kopieren von Blogs fehlgeschlagen.')
            }
        }
        return result;
    }


}