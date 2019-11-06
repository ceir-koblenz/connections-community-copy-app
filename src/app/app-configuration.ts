export class AppConfiguration {
    readonly connectionsUrl: URL

    constructor() {
        this.connectionsUrl = new URL("https://devco.fgbas.uni-koblenz.de");
    }
}