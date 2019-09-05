import { X2jOptions } from 'fast-xml-parser';
import * as Parser from 'fast-xml-parser';

/**
 * Basisklasse für alle XML-Parser
 *
 * @export
 * @abstract
 * @class EntityXmlParserAbstract
 * @template T
 */
export abstract class EntityXmlParserAbstract<T> {

  /**
   * Default-Optionen für alle Parse-Vorgänge.
   *
   * @private
   * @type {Partial<X2jOptions>}
   * @memberof EntityXmlParserAbstract
   */
  private defaultOptions: Partial<X2jOptions> = {
    ignoreAttributes: false
  };

  constructor() { }

  /**
   * von abgeleiteten Klassen zu Implementieren: Befüllt eine Objektinstanz 
   * anhand des geparsten JSON-Objekts
   *
   * @abstract
   * @param {T} entity
   * @param {any} parsedObj
   * @memberof EntityXmlParserAbstract
   */
  abstract fillFromObject(entity: T, parsedObj: any): void

    /**
   * Befüllt eine Objektinstanz mit geparsten Inhalten aus dem XML-String
   *
   * @abstract
   * @param {T} entity
   * @param {string} xmlString
   * @memberof EntityXmlParserAbstract
   */
  fillFromXml(entity: T, xmlString: string): void {
    var json = this.parse(xmlString);

    this.fillFromObject(entity, json);
  }

  /**
   * Wandelt den übergebenen XML-String in ein JSON-Objekt um und gibt es zurück.
   *
   * @protected
   * @param {string} xmlString
   * @returns {*}
   * @memberof EntityXmlParserAbstract
   */
  protected parse(xmlString: string): any {
    return Parser.parse(xmlString, this.defaultOptions)
  }
}