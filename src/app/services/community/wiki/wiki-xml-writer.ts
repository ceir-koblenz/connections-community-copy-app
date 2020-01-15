import { Wiki } from 'src/app/models/remote-applications/wiki.model';

export class WikiXmlWriter {
    toXmlString(wiki: Wiki): string {
        return `
        <entry xmlns="http://www.w3.org/2005/Atom">
        <category term="page" label="page" scheme="tag:ibm.com,2006:td/type"></category>
        <title>${wiki.title}</title>
        <label xmlns="urn:ibm.com/td">${wiki.label}</label>
        <visibility xmlns="urn:ibm.com/td">public</visibility>
        <propagation xmlns="urn:ibm.com/td">false</propagation>
        <summary>${wiki.summary}</summary>
        <content type="text/html"><![CDATA[${wiki.contentXml}]]></content>
        ${wiki.parent ? '<parentUuid xmlns="urn:ibm.com/td">' + wiki.parent.uUid + '</parentUuid>' : ''}
        </entry>`
    }
}
