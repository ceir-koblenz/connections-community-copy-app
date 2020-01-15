import { Layout } from 'src/app/models/layout.model';

export class LayoutXmlWriter {
    toXmlString(layout: Layout): string {
        return `
        <entry        
         xmlns="http://www.w3.org/2005/Atom"      
         xmlns:app="http://www.w3.org/2007/app"  
         xmlns:snx="http://www.ibm.com/xmlns/prod/sn">
            <snx:communityLayout>${layout.layoutName}</snx:communityLayout>
        </entry>`
    }
}