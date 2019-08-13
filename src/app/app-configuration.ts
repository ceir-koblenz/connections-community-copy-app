export class AppConfiguration {
    readonly connectionsUrl: URL

    constructor() {
        this.connectionsUrl = new URL("https://c55.bas.uni-koblenz.de");
    }
}