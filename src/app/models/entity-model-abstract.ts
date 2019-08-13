import { ApiClientService } from '../services/api-client/api-client.service';

/**
 * Stellt ein abstraktes Entitätsmodel dar; Basisklasse für alle Entitäten,
 * die von der Connections-API geladen werden.
 *
 * @export
 * @abstract
 * @class EntityModelAbstract
 */
export abstract class EntityModelAbstract {
    /**
     * Der ApiClient, der zum Nachladen weiterer Entitäten verwendet werden soll.
     *
     * @protected
     * @type {ApiClientService}
     * @memberof EntityModelAbstract
     */
    protected _apiClient: ApiClientService;

    constructor(apiClient: ApiClientService){
        this._apiClient = apiClient;
    }
}