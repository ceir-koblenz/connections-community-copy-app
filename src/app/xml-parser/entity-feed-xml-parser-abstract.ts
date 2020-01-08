import { X2jOptions } from 'fast-xml-parser';
import * as Parser from 'fast-xml-parser';
import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { IEntityModel } from '../models/i-entity-model';

/**
 * Basisklasse für alle XML-Feed-Parser
 *
 * @export
 * @abstract
 * @class EntityFeedXmlParserAbstract
 * @template T
 */
export abstract class EntityFeedXmlParserAbstract<T extends IEntityModel> extends EntityXmlParserAbstract<T> {

  /**
* Gibt die URL zur nächsten Seite des Feeds zurück, falls vorhanden. Sonst null.
* @param parsedObj 
*/
  getNextPageUrl(xmlString: string): URL {
    var parsedObj = this.parse(xmlString); // todo das bedeutet, dass für Collections der Xml-Baum zweimal geparst wird... fürs Fill und fürs getNextPage

    var result: URL = null;

    parsedObj.feed.link.forEach(link => {
      if (result === null && link["@_rel"] == "next") {
        result = new URL(link["@_href"])
      }
    });

    return result;
  }

  /**
 * Gibt die URL zur nächsten Seite des Feeds zurück, falls vorhanden. Sonst null.
 * 
 * !! Hack für Feeds, die einen kaputten Nextpagelink zurückliefern !!
 * 
 * @param parsedObj 
 */
  getNextPageUrlHack(originUrl: any, xmlString: string): URL {
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