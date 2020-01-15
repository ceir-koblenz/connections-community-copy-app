
export class WidgetXmlWriter {
    toXmlString(widgetName: string): string {
        return `            
            <entry xmlns:snx="http://www.ibm.com/xmlns/prod/sn" 
            xmlns="http://www.w3.org/2005/Atom">
                <title type="text">${widgetName}</title>
                <category term="widget" scheme="http://www.ibm.com/xmlns/prod/sn/type">
                </category>
                <snx:widgetDefId>${widgetName}</snx:widgetDefId>
                <snx:widgetCategory>
                </snx:widgetCategory>
                <snx:hidden>false</snx:hidden>
            </entry>`
    }
}