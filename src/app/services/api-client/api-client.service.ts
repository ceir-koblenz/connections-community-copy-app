import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from 'src/app/services/logging/logging.service';

/**
 * Service, welcher den Zugriff auf die Connections-Api kapselt.
 * Alle Api-Zugriffe sollen über diesen Service geschehen!
 *
 * @export ApiClientService
 * @class ApiClientService
 */
@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private httpClient: HttpClient

  /**
   *Creates an instance of ApiClientService.
   * @param {HttpClient} httpClient
   * @param {LoggingService} loggingService
   * @memberof ApiClientService
   */
  constructor(httpClient: HttpClient, private loggingService: LoggingService) {
    this.httpClient = httpClient;
  }

  /**
   * Lädt asynchron das Dokument der übergebenen URL.
   * @param {URL} url Url zum Connections-Endpoint, der das zu ladende XML liefert
   * @returns {Promise<string>} Promise mit dem geladenen XML-String
   * @memberof ApiClientService
   */
  async loadXML(url: URL): Promise<string> {
    var uri = this._getFixedUriString(url);
    this.loggingService.LogInfo('Lade Daten von: ' + uri);

    // ResponseType "text" ist gewählt, um das atomXML Format der Connections-API unterstützten zu können
    var resultPromise = this.httpClient.get(uri, { responseType: "text" }).toPromise();
    try {
      var result: string = (await resultPromise).toString();
      return result;
    } catch (error) {
      this.loggingService.LogError(`Fehler beim Laden der Daten. Statustext: ${error.statusText}`);
      return '';
    }
  }

  /**
   * Lädt asynchron das Dokument der übergebenen URL.
   * @param {URL} url Url zum Connections-Endpoint, der das zu ladende JSON liefert
   * @returns {Promise<string>} Promise mit dem geladenen JSON-String
   * @memberof ApiClientService
   */
  async loadJSON(url: URL): Promise<any> {
    var uri = this._getFixedUriString(url);
    this.loggingService.LogInfo('Lade Daten von: ' + uri);

    var resultPromise = this.httpClient.get(uri, { responseType: "json" }).toPromise();
    try {
      var result = await resultPromise;
      return result;
    } catch (error) {
      this.loggingService.LogError(`Fehler beim Laden der Daten. Statustext: ${error.statusText}`);
      return '';
    }
  }

  /**
   * Sendet den übergebenen XmlString per POST an die API
   *
   * @param {string} xmlString
   * @param {URL} url
   * @returns {Promise<HttpResponse<any>>}
   * @memberof ApiClientService
   */
  async postXML(xmlString: string, url: URL): Promise<HttpResponse<any>> {
    return this._sendXML("POST", xmlString, url);
  }

  /**
   * Sendet den übergebenen XmlString per PUT an die API
   *
   * @param {string} xmlString
   * @param {URL} url
   * @returns {Promise<HttpResponse<any>>}
   * @memberof ApiClientService
   */
  async putXML(xmlString: string, url: URL): Promise<HttpResponse<any>> {
    return this._sendXML("PUT", xmlString, url);
  }

  /**
   * Update Binary File 
   * @param {Blob} binary 
   * @param {URL} url 
   * @param {string} contentType
   * @returns {Promise<string>} Promise mit dem response des PUT 
   */
  async putFile(binary: Blob, url: URL, contentType: string): Promise<HttpResponse<any>> {
    var uri = this._getFixedUriString(url);
    this.loggingService.LogInfo('Sende File an: ' + uri);

    var resultPromise = this.httpClient.request("PUT", uri, { body: binary, observe: "response", headers: { "Content-Type": contentType } }).toPromise()
    try {
      return <HttpResponse<any>>(await resultPromise)
    } catch (error) {
      this.loggingService.LogError(`Fehler beim Senden des Files. Statustext: ${error.statusText}`);
      return null;
    }
  }

  /**
   * Create Binary File 
   * @param {Blob} binary 
   * @param {URL} url 
   * @param {string} contentType
   * @returns {Promise<string>} Promise mit dem response des PUT 
   */
  async postFile(binary: Blob, url: URL, header: {}): Promise<HttpResponse<any>> {
    var uri = this._getFixedUriString(url);
    this.loggingService.LogInfo('Sende File an: ' + uri);

    var resultPromise = this.httpClient.request("POST", uri, { body: binary, observe: "response", headers: header, responseType: "text" }).toPromise()
    try {
      return <HttpResponse<any>>(await resultPromise)
    } catch (error) {
      this.loggingService.LogError(`Fehler beim senden des Files. Statustext: ${error.statusText}`);
      return null;
    }
  }

  /**
   * Sendet den übergebenen XML-String mit dem spezifizierten HttpVerb an die API.
   *
   * @private
   * @param {string} httpVerb http-Verb der auszuführenden Aktion (PUT, POST, ...)
   * @param {string} xmlString zu sendender XMLString
   * @param {URL} url
   * @returns {Promise<HttpResponse<any>>}
   * @memberof ApiClientService
   */
  private async _sendXML(httpVerb: string, xmlString: string, url: URL): Promise<HttpResponse<any>> {
    var uri = this._getFixedUriString(url);
    this.loggingService.LogInfo('Sende Daten an: ' + uri);

    var resultPromise = this.httpClient.request(httpVerb, uri, { body: xmlString, observe: "response", headers: { "Content-Type": "application/atom+xml" }, responseType: "text" }).toPromise()
    try {
      return <HttpResponse<any>>(await resultPromise)
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        var errorMessage = this._parseApiErrorMessage(error);
        this.loggingService.LogError(`Fehler beim Senden der Daten. Statustext: ${error.statusText}. ` + errorMessage);
      } else {
        this.loggingService.LogError(`Fehler beim Senden der Daten.`);
      }     
      return null;
    }
  }

  /**
   *Workaround für Encoding der Response der API... 
   *
   * @private
   * @param {URL} url
   * @returns {string}
   * @memberof ApiClientService
   */
  private _getFixedUriString(url: URL): string {
    return url.toString().replace("&amp;", "&")
  }

  /**
   * Versucht, aus der übergebenen ErrorResponse die Message der Api herauszuparsen um ggf.
   * weitere Fehlerinformationen zu erhalten.
   * Der Member "message" liefert leider nur generische Informationen, daher lieber den Body des Errors parsen...
   * @private
   * @param {HttpErrorResponse} error
   * @returns {string}
   * @memberof ApiClientService
   */
  private _parseApiErrorMessage(error: HttpErrorResponse): string{
    var result = '';
    if(typeof (error.error) === 'string'){
      const regex = /<message>(.*)<\/message>/s;
      var match = regex.exec(error.error);
      if(match) return match[1].trim();
    }
   
    return result
  }
}
