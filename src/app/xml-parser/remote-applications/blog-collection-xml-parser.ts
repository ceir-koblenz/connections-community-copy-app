import { EntityXmlParserAbstract } from '../entity-xml-parser-abstract';
import { BlogCollection } from 'src/app/models/remote-applications/blog-collection.model';
import { BlogXmlParser } from './blog-xml-parser';
import { Blog } from 'src/app/models/remote-applications/blog.model';

/**
 * XML-Parser für das Parsen der Blog Collection einer Community.
 *
 * @export
 * @class BlogCollectionXmlParser
 * @extends {EntityXmlParserAbstract<any>}
 */
export class BlogCollectionXmlParser extends EntityXmlParserAbstract<any>{

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
    getNextPageUrl(originUrl: any, xmlString: string): URL {
        var parsedObj = super.parse(xmlString); // todo das bedeutet, dass für Collections der Xml-Baum zweimal geparst wird... fürs Fill und fürs getNextPage

        var result: URL = null;
        parsedObj.feed.link.forEach(link => {
            if (result === null && link["@_rel"] == "next") {
                result = new URL(link["@_href"]);
                // Quick & dirty ...                
                if (result.search == "?&amp;sI=11") {
                    result.search = "?page=2";
                } else {
                    var pageNumber = parseInt(result.search.charAt(result.search.length - 1));
                    result.search = "?page=" + pageNumber;
                }
                result.href = originUrl + result.search;
            }
        });

        return result;
    }
}