import { Blog } from 'src/app/models/remote-applications/blog.model';

export class BlogXmlWriter {
    toXmlString(blog: Blog): string {
        return `
        <entry xmlns="http://www.w3.org/2005/Atom">
        <category term="page" label="page" scheme="tag:ibm.com,2006:td/type"></category>
        <title>${blog.title}</title>
        <visibility xmlns="urn:ibm.com/td">public</visibility>
        <propagation xmlns="urn:ibm.com/td">false</propagation>
        <summary>${blog.summary}</summary>
        <content type="text/html"><![CDATA[${blog.content}]]></content>
        </entry>`
    }
}
