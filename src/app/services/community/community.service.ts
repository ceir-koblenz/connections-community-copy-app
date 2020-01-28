import { Injectable } from '@angular/core';
import { Community } from 'src/app/models/community.model';
import { ApiClientService } from '../api-client/api-client.service';
import { getConfig } from './../../app-config';
import { CommunityXmlWriter } from './community-xml-writer';
import { HttpResponse } from '@angular/common/http';
import { LoggingService } from '../logging/logging.service';
import { CommunityXmlParser } from 'src/app/xml-parser/community-xml-parser';
import { CommunityCollection } from 'src/app/models/community-collection.model';
import { EntityLink } from 'src/app/common/entity-link';
import { CommunityCollectionXmlParser } from 'src/app/xml-parser/communitycollection-xml-parser';

/**
 * Service zum Laden und Erstellen von Communities.
 *
 * @export
 * @class CommunityService
 */
@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private createPath: string = "/communities/service/atom/communities/my"


  /**
   *Creates an instance of CommunityService.
   * @param {ApiClientService} apiClient
   * @param {LoggingService} loggingService
   * @memberof CommunityService
   */
  constructor(private apiClient: ApiClientService,
    private loggingService: LoggingService) { }

  /**
   * Lädt die Community anhand der übergebenen Id von der Api
   * und gibt das Ergebnis zurück.
   *
   * @param {string} commId
   * @returns {Promise<Community>}
   * @memberof CommunityService
   */
  async loadById(commId: string): Promise<Community> {
    if (!commId) return null;

    var apiUrl = getConfig().connectionsUrl;
    var commUrl = new URL(apiUrl + "/communities/service/atom/community/instance?communityUuid=" + commId);

    var xmlString = await this.apiClient.loadXML(commUrl); // Raw XML laden

    var xmlParser: CommunityXmlParser = new CommunityXmlParser()
    var result = new Community();

    xmlParser.fillFromXml(result, xmlString); // neue Community Instanz anhand des XMLs befüllen

    return result;
  }

  /**
 * Lädt die CommunityCollection anhand der übergebenen Url von der Api und
 * befüllt die Objektinstanz.
 *
 * @param {EntityLink<CommunityCollection>} link
 * @returns {Promise<CommunityCollection>}
 * @memberof CommunityService
 */
  async loadCollection(link: EntityLink<CommunityCollection>): Promise<CommunityCollection> {
    var xmlParser = new CommunityCollectionXmlParser()
    var result = new CommunityCollection();

    var nextPageLink: URL = link.url;

    do {
      var currentXml = await this.apiClient.loadXML(nextPageLink)
      nextPageLink = xmlParser.getNextPageUrl(currentXml)
      xmlParser.fillFromXml(result, currentXml)  // RemoteApplicationCollection Instanz anhand des XMLs befüllen
    } while (nextPageLink !== null);

    link.model = result;

    return result;
  }

  /**
   * Erstellt die übergebene Community und gibt die Httpresponse zurück.
   * @param {Community} community
   * @returns {Promise<HttpResponse<any>>}
   * @memberof CommunityService
   */
  async create(community: Community): Promise<HttpResponse<any>> {
    this.loggingService.LogInfo('Erstelle Community...')

    var writer = new CommunityXmlWriter()

    var xml = writer.toXmlString(community)
    var url = new URL(getConfig().connectionsUrl + this.createPath)

    var result = await this.apiClient.postXML(xml, url)
    if (result && result.ok) {
      // get new community id
      var location = new URL(result.headers.get('Location'));
      var newCommunityId = location.searchParams.get("communityUuid")
      // try update community with old or new image if necessary
      if (community.logo.model.shouldCopy && community.logo.model.blob) {
        url = new URL(getConfig().connectionsUrl + "/communities/service/html/image?communityUuid=" + newCommunityId)
        result = await this.apiClient.putFile(community.logo.model.blob, url, "image/jpeg")
        if (result && result.ok) {
          this.loggingService.LogInfo('Logo update erfolgreich.')
        } else {
          this.loggingService.LogInfo('Logo update fehlgeschlagen.')
        }
      }
      this.loggingService.LogInfo('Community erstellt.')
    } else {
      this.loggingService.LogError('Erstellen der Community fehlgeschlagen.')
    }

    return result
  }


}
