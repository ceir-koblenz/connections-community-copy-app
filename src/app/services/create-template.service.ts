import { Injectable } from '@angular/core';
import { Community } from '../models/community.model';
import { CommunityService } from './community/community.service';
import { asyncForEach } from '../common/async-foreach';
import { WikiService } from './community/wiki/wiki.service';
import { BlogService } from './community/blog/blog.service';
import { FolderService } from './community/file/folder.service';
import { MemberService } from './community/member/member.service';
import { AktivitaetenService } from './community/aktivitaeten/aktivitaeten.service';
import { ProcessStatus } from '../common/process-status';
import { timeout } from '../common/timeout';
import { LayoutService } from './community/layout/layout.service';
import { RemoteApplication } from '../models/remoteapplication.model';
import { Member } from '../models/member.model';
import { WidgetService } from './community/widget/widget.service';
import { Widget } from '../models/widget.model';
import { WidgetDefIds } from './community/widget/widget-ids';
import { LoggingService } from './logging/logging.service';
import { ForumService } from './community/forum/forum.service';


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

  constructor(private loggingService: LoggingService,
    private commService: CommunityService,
    private wikiService: WikiService,
    private blogService: BlogService,
    private memberService: MemberService,
    private layoutService: LayoutService,
    private aktivitaetenService: AktivitaetenService,
    private folderService: FolderService,
    private forumService: ForumService,
    private widgetService: WidgetService) { }


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
      if (community.widgets.model.Widgets) {
        var widgets: Array<Widget> = community.widgets.model.Widgets;
        for (let index = 0; index < widgets.length; index++) {
          if (widgets[index].shouldCopy) {
            processStatus.openCounter += 1;
          }
        }
      }
      if (community.miscApps && community.miscApps.model && community.miscApps.model.remoteApplications) {
        await asyncForEach(community.miscApps.model.remoteApplications, async (remoteApp) => {
          if (remoteApp.shouldCopy && remoteApp.link.model) {
            processStatus.openCounter += 1;
          }
        })
      }
    }
    await countToCopyElements();

    var commResult = await this.commService.create(community)
    if (commResult && commResult.ok) {
      processStatus.countUp("Community wurde erstellt");

      var location = new URL(commResult.headers.get("Location"))
      // get new community id
      var newCommunityId = location.searchParams.get("communityUuid")

      if (community.layouts.model.shouldCopy) {
        var layoutResult = await this.layoutService.createCollection(newCommunityId, community.layouts.model);
        if (layoutResult) {
          processStatus.countUp("Layouts wurden kopiert");
        } else {
          processStatus.countUp("Beim Kopieren der Layouts sind Fehler aufgetreten");
        }
      }

      // Copy Member
      if (community.members.model) {
        var tResult = await this.memberService.create(newCommunityId, community.members.model);
        if (tResult && tResult.ok) {
          processStatus.countUp('Member wurden hinzugefügt.');
        }
      }

      // Create Widgets
      await asyncForEach(community.widgets.model.Widgets, async (widget: Widget) => {
        if (widget.shouldCopy) {
          var tResult = await this.widgetService.createGenericWidget(newCommunityId, widget.widgetDefId);
          if (tResult && tResult.ok) {
            processStatus.countUp(widget.title + ' Widget wurde hinzugefügt.');
          }
        }
      })

      const copyRemoteApps = async () => {
        await asyncForEach(community.miscApps.model.remoteApplications, async (remoteApp: RemoteApplication) => {
          // nur Apps berücksichtigen, die Kopiert werden sollen und deren Model befüllt ist.
          if (!remoteApp.shouldCopy) {
            return;
          } else if (!remoteApp.link.model) {
            var skipWarning = `App "${remoteApp.title}" wurde zum Kopieren ausgewählt, die Daten wurden jedoch nicht geladen - überspringe...`;
            this.loggingService.LogWarning(skipWarning);
            return;
          }

          // try copy wiki
          if (remoteApp.title == "Wiki") {
            var result = await this.wikiService.create(newCommunityId, remoteApp.link.model);
            processStatus.countUp("Wiki wurde kopiert");
          }

          // try copy blog
          if (remoteApp.title == "Blog") {
            var result = await this.blogService.create(newCommunityId, remoteApp.link.model);
            processStatus.countUp("Blog wurde kopiert");
          }

          // try copy files
          if (remoteApp.title == "Files" || remoteApp.title == "Dateien") {
            var result = await this.folderService.create(newCommunityId, remoteApp.link.model);
            processStatus.countUp("Dateien wurden kopiert");
          }

          // try copy aktivitäten
          if (remoteApp.title == "Aktivitäten" || remoteApp.title == "Activities") {
            var result = await this.aktivitaetenService.create(newCommunityId, remoteApp.link.model);
            processStatus.countUp("Aktivitäten wurden kopiert");
          }

          // try copy Lesezeichen
          if (remoteApp.title == "Lesezeichen" || remoteApp.title == "Bookmarks") {
            //TODO: bitte in create von bookmark.service aufnehmen!
            this.widgetService.createWidget(newCommunityId, WidgetDefIds.bookmarks);
            processStatus.countUp("Lesezeichen wurden kopiert");
          }

          // try copy Foren
          if (remoteApp.title == "Foren" || remoteApp.title == "Forums") {
            var result = await this.forumService.createForum(newCommunityId, remoteApp.link.model);
            processStatus.countUp("Foren wurden kopiert");
          }

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
