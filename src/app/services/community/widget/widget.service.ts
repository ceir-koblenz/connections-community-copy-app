import { Injectable } from '@angular/core';
import { WidgetCollection } from 'src/app/models/widget-collection.model';
import { EntityLink } from 'src/app/common/entity-link';
import { ApiClientService } from '../../api-client/api-client.service';
import { WidgetCollectionXmlParser } from 'src/app/xml-parser/widget-collection-xml-parser';
import { HttpResponse } from '@angular/common/http';
import { WidgetXmlWriter } from './widget-xml-writer';
import { getConfig } from 'src/app/app-config';
import { RemoteApplicationCollection } from 'src/app/models/remoteapplication-collection.model';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  constructor(private client: ApiClientService) { }

  // Widgets die bei jeder initialen Erstellung einer Community erstellt werden!
  standardWidgets: Array<String> = [
    'Files',
    'Dateien',
    'Tags',
    'description',
    'Forums',
    'Foren',
    'Bookmarks',
    'Lesezeichen',
    'ImportantBookmarks',
    'MembersSummary',
    'Status Updates',
    'Statusaktualisierungen',
    'RichContent',
  ] //TODO: was ist mit anderen Sprache außer Deutsch & Englisch?

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

  async createWidget(communityId: string, title: string): Promise<HttpResponse<any>> {
    // Create a new wiki widget
    var widgetWriter = new WidgetXmlWriter();
    var xml = widgetWriter.toXmlString(title);
    var url = new URL(getConfig().connectionsUrl + "/communities/service/atom/community/widgets?communityUuid=" + communityId);
    return await this.client.postXML(xml, url);
  }

  async removeStandardWidgets(collection: WidgetCollection) {
    var widgets = collection.Widgets;
    for (let index = 0; index < collection.Widgets.length; index++) {
      if (this.standardWidgets.includes(widgets[index].title)) {
        widgets.splice(index, 1);
        index--;
      }
    }
  }

  async removeRemoteAppWidgets(collection: WidgetCollection, remoteAppsCollection: RemoteApplicationCollection) {
    var widgets = collection.Widgets;
    var remoteApps = remoteAppsCollection.remoteApplications;
    for (let wIndex = 0; wIndex < collection.Widgets.length; wIndex++) {
      for (let rIndex = 0; rIndex < remoteApps.length; rIndex++) {
        if (remoteApps[rIndex].title == widgets[wIndex].title) {
          widgets.splice(wIndex, 1);
          wIndex--;
        }
      }      
    }
  }

}
