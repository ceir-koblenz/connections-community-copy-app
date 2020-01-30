import { Node } from 'src/app/models/remote-applications/node.model';
export class NodeXmlWriter {
    TodotoXmlString(node:Node,Child:boolean): string {
        var result = `
        <entry  xmlns="http://www.w3.org/2005/Atom" xmlns:app="http://www.w3.org/2007/app" xmlns:snx="http://www.ibm.com/xmlns/prod/sn">
        <category scheme="http://www.ibm.com/xmlns/prod/sn/type" term="todo" label="To Do" />
        <title type="text">${node.title}</title>
        <position>${node.position}</position>
        <content type="html">${node.content}</content> `
        if (node.private){
            result = result+`
            <category scheme="http://www.ibm.com/xmlns/prod/sn/flags" term="private" label="Private" />`
        }
        if (Child){
            result = result+ `
            <in-reply-to 
            ref="${node.ref}" 
            type="${node.type}" 
            href="${node.href}" 
            source="${node.source}"/>`
        }
        result = result+ `
        </entry>`
        return result;
    }
    ReplytoXmlString(node:any,Child:boolean): string {
    var result = `
    <entry  xmlns="http://www.w3.org/2005/Atom" xmlns:app="http://www.w3.org/2007/app" xmlns:snx="http://www.ibm.com/xmlns/prod/sn">
    <category scheme="http://www.ibm.com/xmlns/prod/sn/type" term="reply" label="Reply" />
    <position>${node.position}</position>
    <content type="html">${node.content}</content> `
    if (node.private){
        result = result+`
        <category scheme="http://www.ibm.com/xmlns/prod/sn/flags" term="private" label="Private" />`
    }
    if (Child){
        result = result+ `
        <in-reply-to 
        ref="${node.ref}" 
        type="${node.type}" 
        href="${node.href}" 
        source="${node.source}"/>`
    }
    result = result+ `
    </entry>`
    return result;
    }
    ChattoXmlString(node:any,Child:boolean): string {
    var result = `
    <entry  xmlns="http://www.w3.org/2005/Atom" xmlns:app="http://www.w3.org/2007/app" xmlns:snx="http://www.ibm.com/xmlns/prod/sn">
    <category scheme="http://www.ibm.com/xmlns/prod/sn/type" term="chat"/>
    <title type="text">${node.title}</title>
    <content type="html">${node.content}</content> `
    if (node.private){
        result = result+`
        <category scheme="http://www.ibm.com/xmlns/prod/sn/flags" term="private" label="Private" />`
    }
    if (Child){
        result = result+ `
        <in-reply-to 
        type="${node.type}" 
        href="${node.href}"/>`
    }
    result = result+ `
    </entry>`
    return result;
    }
    SectiontoXmlString(node:any): string {
        return `
        <entry  xmlns="http://www.w3.org/2005/Atom">
        <category scheme="http://www.ibm.com/xmlns/prod/sn/type" term="section" label="Section" />
        <title type="text">${node.title}</title>
        <position>${node.position}</position>
    </entry>
        `
    }
    EntrytoXmlString(node:Node,Child:Boolean): string {
        var result =`
        <entry  xmlns="http://www.w3.org/2005/Atom" xmlns:app="http://www.w3.org/2007/app" xmlns:snx="http://www.ibm.com/xmlns/prod/sn">
        <category scheme="http://www.ibm.com/xmlns/prod/sn/type" term="entry" label="Entry" />
        <title type="text">${node.title}</title>
        <position>${node.position}</position>
        <content type="html">${node.content}</content> `
        if (node.private){
            result = result+`
            <category scheme="http://www.ibm.com/xmlns/prod/sn/flags" term="private" label="Private" />`
        }
        if (Child){
            result = result+ `
            <in-reply-to 
            ref="${node.ref}" 
            type="${node.type}" 
            href="${node.href}" 
            source="${node.source}"/>`
        }
        result = result+`
        </entry>`;
        return result;
    }
    EmailtoXmlString(node:any): string {
        return `
        <entry  xmlns="http://www.w3.org/2005/Atom" xmlns:app="http://www.w3.org/2007/app" xmlns:snx="http://www.ibm.com/xmlns/prod/sn">
        <category scheme="http://www.ibm.com/xmlns/prod/sn/type" term="email"/>
        <title type="text">${node.title}</title>
        <content type="html">${node.content}</content> 
    </entry>`
    }

}
