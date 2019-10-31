import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    this.loggingService.LogInfo('Lade Daten von: ' + url.toString());

    // ResponseType "text" ist gewählt, um das atomXML Format der Connections-API unterstützten zu können
    var resultPromise = this.httpClient.get(url.toString(), { responseType: "text" }).toPromise();
    try {
      var result: string = (await resultPromise).toString();
      return result;
    } catch (error) {
      this.loggingService.LogError(`Fehler beim Laden der Daten. Statustext: ${error.statusText}`);
      return '';
    }

  }
}
