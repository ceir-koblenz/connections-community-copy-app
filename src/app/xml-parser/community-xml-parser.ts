import { EntityXmlParserAbstract } from './entity-xml-parser-abstract';
import { CommunityCollection } from '../models/community-collection.model';
import { EntityLink } from '../common/entity-link';
import { Community } from '../models/community.model';
import { Logo } from '../models/logo.model';
import { toHtmlString } from '../common/encoding-utils';
import { LayoutCollection } from '../models/layout-collection.model';
import { WidgetCollection } from '../models/widget-collection.model';
import { RemoteApplicationCollection } from '../models/remoteapplication-collection.model';
import { MemberCollection } from '../models/member-collection.model';

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
        entity.contentHtml = toHtmlString(parsedObj.entry.content["#text"]);
        entity.datePublished = parsedObj.entry.published;
        entity.dateUpdated = parsedObj.entry.updated;
        entity.type = parsedObj.entry["snx:communityType"]

        var link_list = parsedObj.entry.link;
        link_list.forEach(link => {
            switch (link["@_rel"]) {
                case "http://www.ibm.com/xmlns/prod/sn/logo":
                    entity.logo = new EntityLink<Logo>(link["@_href"], "Logo");
                    break;
                case "http://www.ibm.com/xmlns/prod/sn/member-list":
                    entity.members = new EntityLink<MemberCollection>(link["@_href"], "Members");
                    break;
                case "http://www.ibm.com/xmlns/prod/sn/remote-applications":
                    entity.miscApps = new EntityLink<RemoteApplicationCollection>(link["@_href"], "Remote-Applications");
                    break;
                case "http://www.ibm.com/xmlns/prod/sn/widgets":
                    entity.widgets = new EntityLink<WidgetCollection>(link["@_href"], "Widgets");
                    break;
                case "http://www.ibm.com/xmlns/prod/sn/pages":
                    entity.layouts = new EntityLink<LayoutCollection>(link["@_href"], "Layouts");
                default:
                    break;
            }
        });
    }
}