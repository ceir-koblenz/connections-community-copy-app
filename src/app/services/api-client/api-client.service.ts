import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LoggingService} from 'src/app/services/logging/logging.service';

/**
 * Service, welcher den Zugriff auf die Connections-Api kapselt.
 * Alle Api-Zugriffe sollen über diesen Service geschehen!
 *
 * @export
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
   * ResponseType "text" ist gewählt, um das atomXML Format der Connections-API unterstützten zu können
   * @param {URL} url
   * @returns {Promise<string>}
   * @memberof ApiClientService
   */
  async loadXML(url: URL): Promise<string> {
    var resultPromise = this.httpClient.get(url.toString(), {responseType: "text"}).toPromise();
    var result: string = (await resultPromise).toString();
    this.loggingService.LogInfo('Lade Daten von: ' +url.toString());

    return result;
  }
}
