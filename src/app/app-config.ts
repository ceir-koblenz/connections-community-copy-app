import * as JsonConfig from "../assets/config.json"

export function getConfig(): IAppConfig {
    return {
        connectionsUrl: new URL(JsonConfig.connectionsUrl)
    }
}

export interface IAppConfig {
    connectionsUrl: URL
}