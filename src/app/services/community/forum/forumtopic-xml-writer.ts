import { ForumTopic } from 'src/app/models/remote-applications/forumtopic.model';

export class ForumTopicXmlWriter {
    toXmlString(topic: ForumTopic): string {
        return `
        <entry xmlns="http://www.w3.org/2005/Atom">
        <title type="text">${topic.title}</title>
        <content type="html">${topic.content}</content>
        <category term="forum-topic" scheme="http://www.ibm.com/xmlns/prod/sn/type"></category>
        </entry>
    `;
    }
}
