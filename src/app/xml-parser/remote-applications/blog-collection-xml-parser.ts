import { EntityXmlParserAbstract } from '../entity-xml-parser-abstract';
import { BlogCollection } from 'src/app/models/remote-applications/blog-collection.model';
import { BlogXmlParser } from './blog-xml-parser';
import { Blog } from 'src/app/models/remote-applications/blog.model';
import { EntityFeedXmlParserAbstract } from '../entity-feed-xml-parser-abstract';

/**
 * XML-Parser für das Parsen der Blog Collection einer Community.
 *
 * @export
 * @class BlogCollectionXmlParser
 * @extends {EntityXmlParserAbstract<BlogCollection>}
 */
export class BlogCollectionXmlParser extends EntityFeedXmlParserAbstract<BlogCollection>{

    fillFromObject(entity: BlogCollection, parsedObj: any): void {
        var entries = parsedObj.feed.entry;
        var blogParser = new BlogXmlParser();
        if (Array.isArray(entries)) {
            entries.forEach(entry => {
                var blog = new Blog();
                blogParser.fillFromObject(blog, entry);
                entity.blogs.push(blog);
            });
        } else {
            // Aufgrund der pagination kann es vorkommen, dass entries kein array sondern ein object ist.
            var blog = new Blog();
            blogParser.fillFromObject(blog, entries);
            entity.blogs.push(blog);
        }
    }

    /**
     * Gibt die URL zur nächsten Seite des Feeds zurück, falls vorhanden. Sonst null.
     * @param parsedObj 
     */
}