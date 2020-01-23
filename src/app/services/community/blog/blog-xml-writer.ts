import { Blog } from 'src/app/models/remote-applications/blog.model';

export class BlogXmlWriter {
    toXmlString(blog: Blog): string {
        return `<?xml version="1.0" encoding="utf-8"?>
        <entry
         xmlns="http://www.w3.org/2005/Atom"
         xmlns:app="http://www.w3.org/2007/app"
         xmlns:snx="http://www.ibm.com/xmlns/prod/sn">
          <title type="text">${blog.title}</title>
          <content type="html">
          ${blog.content}
          </content>
        </entry>
        `

    }
}
