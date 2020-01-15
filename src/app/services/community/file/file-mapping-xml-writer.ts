import { Folder } from 'src/app/models/remote-applications/folder.model';
import { File } from 'src/app/models/remote-applications/file.model';

export class FileMappingXmlWriter {
    toXmlString(file: File): string {
        return `
        <feed xmlns="http://www.w3.org/2005/Atom">
            <entry>
                <itemId xmlns="urn:ibm.com/td">${file.uUid}</itemId>
            </entry>
        </feed>`
    }
}
