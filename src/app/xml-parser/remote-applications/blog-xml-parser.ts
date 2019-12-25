<<<<<<< HEAD
import { Blog } from 'src/app/models/remote-applications/blog.model';
import { BlogEntry } from 'src/app/models/remote-applications/blog-entry.model';
import { BlogEntryXmlParser } from './blog-entry-xml-parser';
import { EntityFeedXmlParserAbstract } from '../entity-feed-xml-parser-abstract';

/**
 * XML-Parser für das Parsen der Blogs einer Community.
 *
 * @export
 * @class export class BlogXmlParser extends EntityFeedXmlParserAbstract<any>{

 * @extends {EntityFeedXmlParserAbstract<Blog>}
 */
export class BlogXmlParser extends EntityFeedXmlParserAbstract<Blog>{
    fillFromObject(entity: Blog, parsedObj: any): void {
        entity.id = parsedObj["id"];
        entity.title = parsedObj.title["#text"];
        entity.subtitle = parsedObj["td:label"];
        entity.updated = parsedObj.summary["#text"];
        entity.entrycount = parsedObj.author["snx:userid"];
        var entries = parsedObj.feed.entry;
        var blogEntryParser = new BlogEntryXmlParser();
        entries.forEach(entry => {
            var blog_entry = new BlogEntry();
            blogEntryParser.fillFromObject(blog_entry, entry);
            entity.entries.push(blog_entry);
        });
=======
import { EntityXmlParserAbstract } from '../entity-xml-parser-abstract';
import { EntityLink } from '../../common/entity-link';
import { BlogCollection } from 'src/app/models/remote-applications/blog-collection.model';
import { Blog } from 'src/app/models/remote-applications/blog.model';

/**
 * XML-Parser für das Parsen der Remote Apps einer Community.
 *
 * @export
 * @class export class BlogEntryXmlParser extends EntityXmlParserAbstract<any>{

 * @extends {EntityXmlParserAbstract<any>}
 */
export class BlogXmlParser extends EntityXmlParserAbstract<any>{
    fillFromObject(entity: Blog, parsedObj: any): void {
        entity.title = parsedObj.title["#text"];
        console.log(entity.title);
        entity.summary = parsedObj.summary["#text"];
        entity.content = parsedObj.content["#text"];

>>>>>>> Tim
    }
}