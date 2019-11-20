import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { CommunityCollection } from '../models/community-collection.model';
import { EntityLink } from '../common/entity-link';
import { Community } from '../models/community.model';
import { Logo } from '../models/logo.model';

/**
 * XML-Parser für das Parsen einer Community.
 *
 * @export
 * @class CommunityCollectionXmlParser
 * @extends {EntityXmlParserAbstract<Community>}
 */
export class CommunityXmlParser extends EntityXmlParserAbstract<Community>{
    fillFromObject(entity: Community, parsedObj: any): void {
        entity.id = parsedObj.entry["snx:communityUuid"];
        entity.title = parsedObj.entry.title["#text"];
        entity.summary = parsedObj.entry.summary["#text"];

        var link_list = parsedObj.entry.link;
        link_list.forEach(link => {
            // Community logo link
            switch (link["@_rel"]) {
                case "http://www.ibm.com/xmlns/prod/sn/logo":
                    entity.logo = new EntityLink<Logo>(link["@_href"], "Logo");
                    break;
                case "http://www.ibm.com/xmlns/prod/sn/member-list":
                    entity.members = new EntityLink<any>(link["@_href"], "Members");
                    break;
                case "http://www.ibm.com/xmlns/prod/sn/bookmarks":
                    entity.bookmarks = new EntityLink<any>(link["@_href"], "Bookmarks");
                    break;
                case "http://www.ibm.com/xmlns/prod/sn/remote-applications":
                    entity.miscApps = new EntityLink<any>(link["@_href"], "Remote-Applications");
                    break;
                case "http://www.ibm.com/xmlns/prod/sn/widgets":
                    entity.widgets = new EntityLink<any>(link["@_href"], "Widgets");
                    break
                default:
                    break;
            }
            if(link["@_rel"] == "http://www.ibm.com/xmlns/prod/sn/widgets"){
                entity.widgets = new EntityLink<any>(link["@_href"], "Remote-Applications");
            }
        });
        entity.datePublished = parsedObj.entry.published;
        entity.dateUpdated = parsedObj.entry.updated;
        entity.Type = parsedObj.entry["snx:communityType"]

        //Debug
        //console.log(entity.logoUrl.toString());

    }
}