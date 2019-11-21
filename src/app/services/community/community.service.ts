import { Injectable } from '@angular/core';
import { Community } from 'src/app/models/community.model';
import { ApiClientService } from '../api-client/api-client.service';
import { getConfig } from './../../app-config';
import { CommunityXmlWriter } from './community-xml-writer';
import { HttpResponse } from '@angular/common/http';
import { LoggingService } from '../logging/logging.service';
import { CommunityXmlParser } from 'src/app/xml-parser/community-xml-parser';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private createPath: string = "/communities/service/atom/communities/my"


  constructor(private apiClient: ApiClientService,
    private loggingService: LoggingService) { }


  /**
   * Lädt die Community anhand der übergebenen Url von der Api.
   * Lädt den XML-String von der Api und parst diesen anschließend.
   *
   * @static
   * @param {ApiClientService} client
   * @param {URL} url
   * @returns {Promise<Community>}
   * @memberof Community
   */
  async load(client: ApiClientService, url: URL): Promise<Community> {
    var xmlString = await client.loadXML(url); // Raw XML laden

    var xmlParser: CommunityXmlParser = new CommunityXmlParser()
    var result = new Community();

    xmlParser.fillFromXml(result, xmlString); // neue Community Instanz anhand des XMLs befüllen

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
    if (result.ok) {
      this.loggingService.LogInfo('Community erstellt.')
    } else {
      this.loggingService.LogError('Erstellen der Community fehlgeschlagen.')
    }

    return result
  }


}
