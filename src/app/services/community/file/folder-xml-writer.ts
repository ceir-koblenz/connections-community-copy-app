import { Folder } from 'src/app/models/remote-applications/folder.model';

export class FolderXmlWriter {
    toXmlString(folder: Folder): string {
        return `
        <entry xmlns="http://www.w3.org/2005/Atom">
        <category term="collection" label="collection" scheme="tag:ibm.com,2006:td/type"/>
        <label xmlns="urn:ibm.com/td" makeUnique="false">${folder.label}</label>
        <title>${folder.title}</title>
        <summary type="text">${folder.summary}</summary>
        </entry>`
    }
}
