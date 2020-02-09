import { Forum } from 'src/app/models/remote-applications/forum.model';

export class ForumXmlWriter {
    toXmlString(forum: Forum): string {
        return `
        <entry xmlns="http://www.w3.org/2005/Atom">
        <title type="text">${forum.title}</title>
        <content type="text">${forum.content}</content>
        <category term="forum-forum" scheme="http://www.ibm.com/xmlns/prod/sn/type"></category>
        </entry>
    `;
    }
}
