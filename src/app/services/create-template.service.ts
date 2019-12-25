import { Injectable } from '@angular/core';
import { Community } from '../models/community.model';
import { CommunityService } from './community/community.service';
import { asyncForEach } from '../common/async-foreach';
import { WikiService } from './community/wiki/wiki.service';
import { MemberService } from './community/member/member.service';

/**
 * Service für den Kopiervorgang einer Community samt aller abhängigen Entitäten
 *
 * @export
 * @class CreateTemplateService
 */
@Injectable({
  providedIn: 'root'
})
export class CreateTemplateService {

  constructor(private commService: CommunityService, private wikiService: WikiService
              , private memberService:MemberService) { }

  async create(community: Community): Promise<CreateTemplateResult> {
    var result = new CreateTemplateResult()
    result.success = true

    var commResult = await this.commService.create(community)
    if (commResult.ok) {
      var location = new URL(commResult.headers.get("Location"))

      // get new community id
      var newCommunityId = location.searchParams.get("communityUuid")

      // Copy Member
      const copyMember = async () => {
        if(community.members.model){
          await this.memberService.create(newCommunityId, community.members.model);
        }

      }
      await copyMember();

      const copyRemoteApps = async () => {
        await asyncForEach(community.miscApps.model.remoteApplications, async (remoteApp) => {
          // try copy wiki
          if (remoteApp.link.name == "Wiki" && remoteApp.link.model) {
            await this.wikiService.create(newCommunityId, remoteApp.link.model);
          }

          // try copy files


          //TODO: weitere Entitäten zur Community hinzufügen


        })
      }
      await copyRemoteApps();

    } else {
      result.success = false
    }

    return result
  }
}

/**
 * Stellt Ergebnis des Template-Erstellens dar.
 *
 * @export
 * @class CreateTemplateResult
 */
export class CreateTemplateResult {
  success: boolean
}
