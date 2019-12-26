import { Injectable } from '@angular/core';
import { MemberCollection } from 'src/app/models/member-collection.model';
import { Member } from 'src/app/models/member.model';
import { MemberCollectionXmlParser } from 'src/app/xml-parser/member-collection-xml-parser';
import { EntityLink } from 'src/app/common/entity-link';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { asyncForEach } from 'src/app/common/async-foreach';
import { ApiClientService } from '../../api-client/api-client.service';
import { LoggingService } from '../../logging/logging.service';
import { MemberXmlWriter } from './member-xml-writer';
import { getConfig } from 'src/app/app-config';

@Injectable({
    providedIn: 'root'
})
export class MemberService {

    constructor(private apiClient: ApiClientService,
        private loggingService: LoggingService) { }
/**
 *Fügt die ausgewählten Member der neuen Community hinzu
 *
 * @param {string} newCommunityId
 * @param {MemberCollection} memberCollection
 * @memberof MemberService
 */
async create(newCommunityId: string, memberCollection: MemberCollection) {
        var memberToCopy: Array<Member> = new Array<Member>();
        const getMemberToCopy = async () => {
            await asyncForEach(memberCollection.membercollection, async (member:Member) => {
                if (member.shouldCopy) {
                    memberToCopy.push(member);
                }
            });
        }
        await getMemberToCopy();

        if (memberToCopy.length > 0) {
                // Create member
                var memberWriter = new MemberXmlWriter()
                const copyMembers = async () => {
                    await asyncForEach(memberToCopy, async (member) => {
                        var xml = memberWriter.toXmlString(member,newCommunityId);
                        var url = new URL(getConfig().connectionsUrl + "/communities/service/atom/community/members?communityUuid="+newCommunityId)
                        var result = await this.apiClient.postXML(xml, url)
                        if (result.ok) {
                            this.loggingService.LogInfo('Member wurde erstellt.')
                        } else {
                            this.loggingService.LogInfo('Member erstellen fehlgeschlagen.')
                        }
                    });
                }
                await copyMembers();
        }
    }

}