import { Injectable } from '@angular/core';
import { MemberCollection } from 'src/app/models/member-collection.model';
import { Member } from 'src/app/models/member.model';
import { MemberCollectionXmlParser } from 'src/app/xml-parser/member-collection-xml-parser';
import { EntityLink } from 'src/app/common/entity-link';
import { asyncForEach } from 'src/app/common/async-foreach';
import { ApiClientService } from '../../api-client/api-client.service';
import { LoggingService } from '../../logging/logging.service';
import { MemberXmlWriter } from './member-xml-writer';
import { getConfig } from 'src/app/app-config';
import { ProcessStatus } from 'src/app/common/process-status';
import { HttpResponse } from '@angular/common/http';

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
    async create(newCommunityId: string, memberCollection: MemberCollection): Promise<HttpResponse<any>> {
        var memberToCopy: Array<Member> = new Array<Member>();
        const getMemberToCopy = async () => {
            await asyncForEach(memberCollection.members, async (member: Member) => {
                if (member.shouldCopy) {
                    memberToCopy.push(member);
                }
            });
        }
        await getMemberToCopy();

        if (memberToCopy.length > 0) {
            // Create member
            var memberWriter = new MemberXmlWriter()
            var result = new HttpResponse<any>();
            const copyMembers = async () => {
                await asyncForEach(memberToCopy, async (member) => {
                    var xml = memberWriter.toXmlString(member, newCommunityId);
                    var url = new URL(getConfig().connectionsUrl + "/communities/service/atom/community/members?communityUuid=" + newCommunityId)
                    result = await this.apiClient.postXML(xml, url)
                    if (result.ok) {
                        this.loggingService.LogInfo('Member ' + member.name + ' wurde hinzugefügt.');
                    } else {
                        this.loggingService.LogInfo('Member ' + member.name + ' hinzugefügen fehlgeschlagen.')
                    }
                });
            }
            await copyMembers();
            return result;
        }
    }

    /**
     * Lädt die MemberCollection anhand der übergebenen Url von der Api und
     * befüllt die Objektinstanz.
     *
     * @param {EntityLink<MemberCollection>} link
     * @returns {Promise<MemberCollection>}
     * @memberof MemberService     
     */
    async loadCollection(link: EntityLink<MemberCollection>): Promise<MemberCollection> {
        var xmlString = await this.apiClient.loadXML(link.url); // Raw XML laden

        var xmlParser = new MemberCollectionXmlParser();
        var result = new MemberCollection();

        xmlParser.fillFromXml(result, xmlString); // neue MemberCollection Instanz anhand des XMLs befüllen
        link.model = result;

        return result;
    }
}