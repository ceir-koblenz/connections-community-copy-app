import { Aktivitaet } from 'src/app/models/remote-applications/aktivitaeten.model';

export class AktivitaetenXmlWriter {
    toXmlString(aktivitaet: Aktivitaet): string {
        return `
        <entry  xmlns="http://www.w3.org/2005/Atom" xmlns:app="http://www.w3.org/2007/app" xmlns:snx="http://www.ibm.com/xmlns/prod/sn">
        <category term="Activities" scheme="http://www.ibm.com/xmlns/prod/sn/type"></category>  
        <title type="text">${aktivitaet.title}</title>
        <content type="text">${aktivitaet.ziel}</content>
    </entry>`
    }
}