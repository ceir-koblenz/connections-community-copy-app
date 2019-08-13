import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/app-configuration';


/**
 *Service, der die Konfigurationsdatei der Client-Anwendung bereitstellt
 *
 * @export
 * @class ConfigurationService
 */
@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  constructor() { }

  /**
   * Lädt die Konfiguration und gibt sie zurück
   *
   * @returns {AppConfiguration}
   * @memberof ConfigurationService
   */
  getConfig(): AppConfiguration{
    /**Erstellt aktuell einfach eine neue Instanz - später
     * soll die Konfiguration ggf. aus einer Datei vom webServer geladen werden
     * */
    return new AppConfiguration();
  }
}
