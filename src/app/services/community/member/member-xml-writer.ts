import { Member } from 'src/app/models/member.model';

export class MemberXmlWriter {
    toXmlString(member: Member,newCommunityID:String): string {
        return `
        <entry xmlns="http://www.w3.org/2005/Atom">            
            <contributor>
                <name>${member.name}</name>
                <email>${member.email}</email>
                    <snx:userid xmlns:snx="http://www.ibm.com/xmlns/prod/sn">${member.UUid}</snx:userid>
                    <snx:userState xmlns:snx="http://www.ibm.com/xmlns/prod/sn">active</snx:userState>
            </contributor>
            <snx:role xmlns:snx="http://www.ibm.com/xmlns/prod/sn" component="http://www.ibm.com/xmlns/prod/sn/communities">${member.role}</snx:role>
        </entry>`
    }
}