import { Injectable } from '@angular/core';
import { Community } from '../models/community.model';
import { CommunityService } from './community/community.service';
import { asyncForEach } from '../common/async-foreach';
import { WikiService } from './community/wiki/wiki.service';
import { MemberService } from './community/member/member.service';
import { AktivitaetenService } from './community/aktivitaeten/aktivitaeten.service';
import { FileService } from './community/file/file.service';
import { ProcessStatus } from '../common/process-status';
import { timeout } from '../common/timeout';
import { LayoutService } from './community/layout.service';
import { AktivitaetenCollectionXmlParser } from '../xml-parser/remote-applications/aktivitaeten-collection-xml-parser';


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

  constructor(private commService: CommunityService,
    private wikiService: WikiService,
    private memberService: MemberService,
    private fileService: FileService,
    private layoutService: LayoutService,
    private aktivitaetenService: AktivitaetenService) { }

  async create(community: Community, processStatus: ProcessStatus): Promise<CreateTemplateResult> {
    var result = new CreateTemplateResult()
    result.success = true

    // Count to copy elements TODO auslagern
    processStatus.openCounter = 1; // Default value. Community wird ab hier immer kopiert.  
    const countToCopyElements = async () => {
      if (community.layouts.model.shouldCopy) {
        processStatus.openCounter += community.layouts.model.layouts.length
      }

      if (community.miscApps.model.shouldCopy) {
        await asyncForEach(community.miscApps.model.remoteApplications, async (remoteApp) => {
          if (remoteApp.link.model && remoteApp.link.model.shouldCopy) {
            processStatus.openCounter += 1;
          }
        })
      }
    }
    await countToCopyElements();

    var commResult = await this.commService.create(community)
    if (commResult.ok) {
      processStatus.countUp();
      processStatus.log("Community wurde erstellt");

      var location = new URL(commResult.headers.get("Location"))
      // get new community id
      var newCommunityId = location.searchParams.get("communityUuid")

      if (community.layouts.model.shouldCopy) {
        var layoutResult = await this.layoutService.createCollection(newCommunityId, community.layouts.model);
        if (layoutResult) {
          processStatus.log("Layouts wurden kopiert");
        } else {
          processStatus.log("Beim Kopieren der Layouts sind Fehler aufgetreten");
        }

        processStatus.countUp();
      }

      // Copy Member
      const copyMember = async () => {
        if (community.members.model) {
          await this.memberService.create(newCommunityId, community.members.model);
        }

      }
      await copyMember();

      const copyRemoteApps = async () => {
        await asyncForEach(community.miscApps.model.remoteApplications, async (remoteApp) => {
          // try copy wiki
          if (remoteApp.link.name == "Wiki" && remoteApp.link.model) {
            var result = await this.wikiService.create(newCommunityId, remoteApp.link.model);
            if (result.ok) {
              processStatus.countUp();
              processStatus.log("Wiki wurde kopiert");
            }
          }

          // try copy files
          if ((remoteApp.link.name == "Files" || "Dateien") && remoteApp.link.model) {
            var result = await this.fileService.create(newCommunityId, remoteApp.link.model);
            if (result && result.ok) {
              processStatus.countUp();
              processStatus.log("Dateien wurden kopiert");
            }
          }

          // try copy aktivitäten

          if (remoteApp.link.name == "Activities" && remoteApp.link.model) {
            var result = await this.aktivitaetenService.create(newCommunityId, remoteApp.link.model);
            if (result && result.ok) {
              processStatus.countUp();
              processStatus.log("Dateien wurden kopiert");
            }
          }

          //TODO: weitere Entitäten zur Community hinzufügen

        })
      }
      await copyRemoteApps();

    } else {
      result.success = false
    }

    // Kleiner Timeout für die UX, damit 100% kurz angezeigt wird.
    await timeout(3000);

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
