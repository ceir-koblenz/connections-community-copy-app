import { Injectable } from '@angular/core';
import { WidgetCollection } from 'src/app/models/widget-collection.model';
import { EntityLink } from 'src/app/common/entity-link';
import { ApiClientService } from '../../api-client/api-client.service';
import { WidgetCollectionXmlParser } from 'src/app/xml-parser/widget-collection-xml-parser';

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
}
