import { Injectable } from '@angular/core';
import { Community } from '../models/community.model';
import { CommunityService } from './community/community.service';
import { asyncForEach } from '../common/async-foreach';
import { WikiService } from './community/wiki/wiki.service';
import { FolderService } from './community/file/folder.service';
import { MemberService } from './community/member/member.service';
import { AktivitaetenService } from './community/aktivitaeten/aktivitaeten.service';
import { FileService } from './community/file/file.service';
import { ProcessStatus } from '../common/process-status';
import { timeout } from '../common/timeout';
import { AktivitaetenCollectionXmlParser } from '../xml-parser/remote-applications/aktivitaeten-collection-xml-parser';
import { LayoutService } from './community/layout/layout.service';
import { RemoteApplication } from '../models/remoteapplication.model';
import { Member } from '../models/member.model';
import { MemberCollection } from '../models/member-collection.model';


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
    private layoutService: LayoutService,
    private aktivitaetenService: AktivitaetenService,
    private folderService: FolderService) { }


  async create(community: Community, processStatus: ProcessStatus): Promise<CreateTemplateResult> {
    var result = new CreateTemplateResult()
    result.success = true

    // Count to copy elements TODO: auslagern
    processStatus.openCounter = 1; // Default value. Community wird ab hier immer kopiert.  
    const countToCopyElements = async () => {
      if (community.layouts.model.shouldCopy) {
        processStatus.openCounter += 1;
      }
      if (community.members.model.members) {
        var members: Array<Member> = community.members.model.members;
        for (let index = 0; index < members.length; index++) {
          if (members[index].shouldCopy) {
            processStatus.openCounter += 1;
            break;
          }
        }
      }
      if (community.miscApps && community.miscApps.model && community.miscApps.model.remoteApplications) {
        await asyncForEach(community.miscApps.model.remoteApplications, async (remoteApp) => {
          if (remoteApp.shouldCopy) {
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
      if (community.members.model) {
        var tResult = await this.memberService.create(newCommunityId, community.members.model);
        if (tResult && tResult.ok) {
          processStatus.countUp();
          processStatus.log('Member wurden hinzugefügt.');
        }
      }

      const copyRemoteApps = async () => {
        await asyncForEach(community.miscApps.model.remoteApplications, async (remoteApp: RemoteApplication) => {
          // try copy wiki
          if (remoteApp.shouldCopy && remoteApp.title == "Wiki" && remoteApp.link.model) {
            var result = await this.wikiService.create(newCommunityId, remoteApp.link.model);
            processStatus.countUp();
            processStatus.log("Wiki wurde kopiert");
          }

          // try copy files
          if (remoteApp.shouldCopy && (remoteApp.title == "Files" || remoteApp.title == "Dateien") && remoteApp.link.model) {
            var result = await this.folderService.create(newCommunityId, remoteApp.link.model);
            processStatus.countUp();
            processStatus.log("Dateien wurden kopiert");
          }

          // try copy aktivitäten
          if (remoteApp.shouldCopy && (remoteApp.title == "Aktivitäten" || remoteApp.title == "Activities") && remoteApp.link.model) {
            var result = await this.aktivitaetenService.create(newCommunityId, remoteApp.link.model);
            processStatus.countUp();
            processStatus.log("Aktivitäten wurden kopiert");
          }

          // try copy Blog
          if (remoteApp.shouldCopy && remoteApp.title == "Blog") {
            //TODO:
            processStatus.countUp();
            processStatus.log("Blog wurde kopiert");
          }

          // try copy zugehörige communitys
          if (remoteApp.shouldCopy && (remoteApp.title == "Zugehörige Communitys" || remoteApp.title == "Related Communities")) {
            //TODO:
            processStatus.countUp();
            processStatus.log("Zugehörige Communitys wurden kopiert");
          }

          // try copy Statusaktualisierungen
          if (remoteApp.shouldCopy && (remoteApp.title == "Statusaktualisierungen" || remoteApp.title == "Status Updates")) {
            //TODO:
            processStatus.countUp();
            processStatus.log("Statusaktualisierungen wurden kopiert");
          }

          // try copy Lesezeichen
          if (remoteApp.shouldCopy && (remoteApp.title == "Lesezeichen" || remoteApp.title == "Bookmarks")) {
            //TODO:
            processStatus.countUp();
            processStatus.log("Lesezeichen wurden kopiert");
          }

          // try copy Ideen-Blog
          if (remoteApp.shouldCopy && (remoteApp.title == "Ideen-Blog" || remoteApp.title == "Ideation Blog")) {
            //TODO:
            processStatus.countUp();
            processStatus.log("Ideen-Blog wurde kopiert");
          }

          // try copy Foren
          if (remoteApp.shouldCopy && (remoteApp.title == "Foren" || remoteApp.title == "Forums")) {
            //TODO:
            processStatus.countUp();
            processStatus.log("Foren wurden kopiert");
          }

          // try copy Feeds
          if (remoteApp.shouldCopy && remoteApp.title == "Feeds") {
            //TODO:
            processStatus.countUp();
            processStatus.log("Feeds wurden kopiert");
          }

          // try copy Calendar
          if (remoteApp.shouldCopy && remoteApp.title == "Calendar") {
            //TODO:
            processStatus.countUp();
            processStatus.log("Calendar wurden kopiert");
          }

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
