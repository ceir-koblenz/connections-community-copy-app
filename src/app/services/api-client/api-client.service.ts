import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
    var uri = url.toString().replace("&amp;", "&") // Workaround für Encoding der Response der API... 
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

  async postXML(xmlString: string, url: URL): Promise<HttpResponse<any>> {
    var uri = url.toString().replace("&amp;", "&") // Workaround für Encoding der Response der API... 
    this.loggingService.LogInfo('Sende Daten an: ' + uri);

    var resultPromise = this.httpClient.request("POST", uri, { body: xmlString, observe: "response", headers: { "Content-Type": "application/atom+xml" } }).toPromise()
    try {
      return <HttpResponse<any>>(await resultPromise)
    } catch (error) {
      this.loggingService.LogError(`Fehler beim Senden der Daten. Statustext: ${error.statusText}`);
      return null;
    }

  }
}
