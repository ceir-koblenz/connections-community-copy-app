import { IEntityModel } from './i-entity-model';
import { ApiClientService } from '../services/api-client/api-client.service';

/**
 * EntityModel eines Logo.
 *
 * @export
 * @class Logo
 * @implements {IEntityModel}
 */
export class Logo implements IEntityModel{
    shouldCopy: boolean = false;
    blob:Blob;
}