import { Community } from 'src/app/models/community.model';
import { toEncodedHtml } from 'src/app/common/encoding-utils';

export class CommunityXmlWriter {
    toXmlString(comm: Community): string {
        return `
        <entry        
         xmlns="http://www.w3.org/2005/Atom"      
         xmlns:app="http://www.w3.org/2007/app"  
         xmlns:snx="http://www.ibm.com/xmlns/prod/sn">
            <title type="text">${comm.title}</title>
            <content type="html">${toEncodedHtml(comm.contentHtml)}</content>
            <category term="community" scheme="http://www.ibm.com/xmlns/prod/sn/type"></category>
            <snx:communityType>${comm.type}</snx:communityType>
        </entry>`
    }
}