import { Injectable } from '@angular/core';
import { WidgetCollection } from 'src/app/models/widget-collection.model';
import { EntityLink } from 'src/app/common/entity-link';
import { ApiClientService } from '../../api-client/api-client.service';
import { WidgetCollectionXmlParser } from 'src/app/xml-parser/widget-collection-xml-parser';
import { HttpResponse } from '@angular/common/http';
import { WidgetXmlWriter } from './widget-xml-writer';
import { getConfig } from 'src/app/app-config';
import { WidgetDefIds, defaultWidgets, appDependentWidgets } from './widget-ids';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  constructor(private client: ApiClientService) { }

  /**
 * Lädt die Widgets anhand des übergebenen EntityLinks und gibt sie zurück
 *
 * @param {EntityLink<WidgetCollection>} link EntityLink, der auf die zu ladende WidgetCollection zeigt
 * @returns {Promise<WidgetCollection>} geladene WidgetCollection
 * @memberof WidgetService
 */
  async loadCollection(link: EntityLink<WidgetCollection>): Promise<WidgetCollection> {
    var xmlString = await this.client.loadXML(link.url);

    var xmlParser: WidgetCollectionXmlParser = new WidgetCollectionXmlParser()
    var result = new WidgetCollection;

    xmlParser.fillFromXml(result, xmlString);
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
    var widgetWriter = new WidgetXmlWriter();
    var xml = widgetWriter.toXmlString(widgetId);
    var url = new URL(getConfig().connectionsUrl + "/communities/service/atom/community/widgets?communityUuid=" + communityId);
    return await this.client.postXML(xml, url);
  }

  /**
   * Entfert Widgets, die standardmäßig in einer neuen Community enthalten sind, aus der Collection,
   * um zu vermeiden, dass versucht wird, Widgets doppelt hinzuzufügen.
   *
   * @param {WidgetCollection} collection
   * @memberof WidgetService
   */
  async removeStandardWidgets(collection: WidgetCollection) {
    var widgets = collection.Widgets;
    for (let index = 0; index < collection.Widgets.length; index++) {
      if (defaultWidgets.map(x => x as string).includes(widgets[index].widgetDefId)) {
        widgets.splice(index, 1);
        index--;
      }
    }
  }

  /**
   * Entfernt Widgets, deren Funktion von einer installierten RemoteApp abhängig sind, aus der WidgetCollection.
   *
   * @param {WidgetCollection} collection
   * @memberof WidgetService
   */
  async removeRemoteAppWidgets(collection: WidgetCollection) {
    var widgets = collection.Widgets;
    for (let wIndex = collection.Widgets.length - 1; wIndex >= 0; wIndex--) {
      if (appDependentWidgets.map(x => x as string).includes(widgets[wIndex].widgetDefId)) {
        widgets.splice(wIndex, 1);
      }
    }
  }
}
