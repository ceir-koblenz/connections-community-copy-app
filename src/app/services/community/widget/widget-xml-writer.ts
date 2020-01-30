
export class WidgetXmlWriter {
    toXmlString(widgetId: string): string {
        return `            
            <entry xmlns:snx="http://www.ibm.com/xmlns/prod/sn" 
            xmlns="http://www.w3.org/2005/Atom">
                <category term="widget" scheme="http://www.ibm.com/xmlns/prod/sn/type">
                </category>
                <snx:widgetDefId>${widgetId}</snx:widgetDefId>
                <snx:hidden>false</snx:hidden>
            </entry>`
    }
}