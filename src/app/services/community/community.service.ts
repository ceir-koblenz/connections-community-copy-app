import { Injectable } from '@angular/core';
import { Community } from 'src/app/models/community.model';
import { ApiClientService } from '../api-client/api-client.service';
import { getConfig } from './../../app-config';
import { CommunityXmlWriter } from './community-xml-writer';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private createPath: string = "/communities/service/atom/communities/my"

  constructor(private apiClient: ApiClientService) { }

  create(community: Community): void {
    var writer = new CommunityXmlWriter()
    
    var xml = writer.toXmlString(community)
    var url = new URL(getConfig().connectionsUrl + this.createPath)

    var result = this.apiClient.postXML(xml, url)
    console.log(result)
  }
}
