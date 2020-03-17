import { Injectable } from '@angular/core';
import { WidgetCollection } from 'src/app/models/widget-collection.model';
import { EntityLink } from 'src/app/common/entity-link';
import { ApiClientService } from '../../api-client/api-client.service';
import { WidgetCollectionXmlParser } from 'src/app/xml-parser/widget-collection-xml-parser';
import { HttpResponse } from '@angular/common/http';
import { WidgetXmlWriter } from './widget-xml-writer';
import { getConfig } from 'src/app/app-config';
import { WidgetDefIds, appDependentWidgets } from './widget-ids';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  /**
   * Cache für WidgetIds der Widgets, die zu einer Community bereits erstellt wurden
   *
   * @private
   * @memberof WidgetService
   */
  private _widgetCache = new Map<string, Array<string>>();

  constructor(private client: ApiClientService) { }

  /**
 * Lädt die Widgets anhand des übergebenen EntityLinks und gibt sie zurück
 *
 * @param {EntityLink<WidgetCollection>} link EntityLink, der auf die zu ladende WidgetCollection zeigt
 * @returns {Promise<WidgetCollection>} geladene WidgetCollection
 * @memberof WidgetService
 */
  async loadCollection(link: EntityLink<WidgetCollection>): Promise<WidgetCollection> {
    var result = new WidgetCollection;
    await this._loadCollectionByUrl(link.url, result);
    link.model = result

    return result;
  }

  /**
   * Erstellt das Widget der übergebenen WidgetId
   *
   * @param {string} communityId
   * @param {WidgetDefIds} widgetId
   * @returns {Promise<HttpResponse<any>>}
   * @memberof WidgetService
   */
  async createWidget(communityId: string, widgetId: WidgetDefIds): Promise<HttpResponse<any>> {
    return await this.createGenericWidget(communityId, widgetId);
  }

  /**
   * Erstellt das Widget der übergebenen WidgetId. Akzeptiert die Id des Widgets als String, um auch
   * custom Widgets, die nicht im WidgetDefIds-Enum deklariert sind, zu unterstützen.
   *
   * @param {string} communityId
   * @param {string} widgetId
   * @returns {Promise<HttpResponse<any>>}
   * @memberof WidgetService
   */
  async createGenericWidget(communityId: string, widgetId: string): Promise<HttpResponse<any>> {
    if (!this._widgetCache.has(communityId)) {
      await this._buildWidgetCache(communityId);
    }

    // Wenn widget schon vorhanden
    var cached = this._widgetCache.get(communityId);

    if (cached.indexOf(widgetId) > -1) {
      return;
    }

    var widgetWriter = new WidgetXmlWriter();
    var xml = widgetWriter.toXmlString(widgetId);
    var url = this._getUrl(communityId);
    const apiResult = await this.client.postXML(xml, url);

    if (apiResult.ok) {
      this._widgetCache.get(communityId).push(widgetId);
    }

    return apiResult
  }

  /**
   * Entfernt Widgets, deren Funktion von einer installierten RemoteApp abhängig sind, aus der WidgetCollection.
   *
   * @param {WidgetCollection} collection
   * @memberof WidgetService
   */
  removeRemoteAppWidgets(collection: WidgetCollection) {
    var widgets = collection.Widgets;
    for (let wIndex = collection.Widgets.length - 1; wIndex >= 0; wIndex--) {
      if (appDependentWidgets.map(x => x as string).includes(widgets[wIndex].widgetDefId)) {
        widgets.splice(wIndex, 1);
      }
    }
  }

  /**
  *Lädt die Widgets anhand der übergebenen Url
  * @private
  * @param {URL} url URL des Widget-Endpoints
  * @param {WidgetCollection} collection zu befüllende WidgetCollection
  * @memberof WidgetService
  */
  private async _loadCollectionByUrl(url: URL, collection: WidgetCollection): Promise<void> {
    var xmlString = await this.client.loadXML(url);

    var xmlParser: WidgetCollectionXmlParser = new WidgetCollectionXmlParser()

    xmlParser.fillFromXml(collection, xmlString);
  }

  /**
   *Ermittelt die URL des Widget-Endpoints für die Community der übergebenen ID
   *
   * @private
   * @param {string} communityId
   * @returns {URL}
   * @memberof WidgetService
   */
  private _getUrl(communityId: string): URL {
    return new URL(getConfig().connectionsUrl + "/communities/service/atom/community/widgets?communityUuid=" + communityId);
  }

  /**
   * Initialisiert den Widgetcache für die Community der übergebenen Id; lädt deren Widgets und hinterlegt sie im Cache.
   *
   * @private
   * @param {string} communityId
   * @memberof WidgetService
   */
  private async _buildWidgetCache(communityId: string): Promise<void> {
    var result = new WidgetCollection;

    await this._loadCollectionByUrl(this._getUrl(communityId), result);

    this._widgetCache.set(communityId, result.Widgets.map(x => x.widgetDefId));
  }
}
