import { EntityXmlParserAbstract } from '../entity-xml-parser-abstract';
import { EntityLink } from '../../common/entity-link';
import { Blog } from 'src/app/models/remote-applications/blog.model';
import { BlogEntry } from 'src/app/models/remote-applications/blog-entry.model';
import { BlogEntryXmlParser } from './blog-entry-xml-parser';

/**
 * XML-Parser für das Parsen der Remote Apps einer Community.
 *
 * @export
 * @class export class WikiXmlParser extends EntityXmlParserAbstract<any>{

 * @extends {EntityXmlParserAbstract<any>}
 */
export class BlogXmlParser extends EntityXmlParserAbstract<any>{
    fillFromObject(entity: Blog, parsedObj: any): void {
        entity.id = parsedObj["id"];
        entity.title = parsedObj.title["#text"];
        entity.subtitle = parsedObj["td:label"];  
        entity.updated = parsedObj.summary["#text"];
        entity.entrycount = parsedObj.author["snx:userid"];      
        var entries = parsedObj.feed.entry;
        var wikiParser = new BlogEntryXmlParser();
        entries.forEach(entry => {
            var blog_entry = new BlogEntry();
            wikiParser.fillFromObject(blog_entry, entry);
            entity.entries.push(blog_entry);
    });
}

/**
 * Gibt die URL zur nächsten Seite des Feeds zurück, falls vorhanden. Sonst null.
 * @param parsedObj 
 */
getNextPageUrl(originUrl:any, xmlString: string): URL {
    var parsedObj = super.parse(xmlString); // todo das bedeutet, dass für Collections der Xml-Baum zweimal geparst wird... fürs Fill und fürs getNextPage

    var result: URL = null;
    parsedObj.feed.link.forEach(link => {
        if (result === null && link["@_rel"] == "next") {
            result = new URL(link["@_href"]);
            // Quick & dirty ...                
            if (result.search == "?&amp;sI=11") {                                        
                result.search = "?page=2";
            } else {
                var pageNumber = parseInt(result.search.charAt(result.search.length-1));
                result.search = "?page=" + pageNumber;
            }          
            result.href = originUrl + result.search;
        }
    });

    return result;
}
}