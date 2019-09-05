import { IEntityModel } from '../models/i-entity-model';

/**
 * Stellt einen Link dar, der zum Nachladen einer Entität verwendet werden kann
 * (Funktion ähnlich zu Lazy Loading...)
 * @export
 * @class EntityLink
 * @template T
 */
export class EntityLink<T extends IEntityModel>{
    /**
     * Die Url, unter der die verknüpfte Entität geladen werden kann.
     *
     * @type {URL}
     * @memberof EntityLink
     */
    readonly url: URL
    /**
     * Der Name der verknüpften Entität.
     *
     * @type {string}
     * @memberof EntityLink
     */
    readonly name: string
    /**
     * Die konkrete Instanz der Entität, sofern diese schon nachgeladen wurde.
     *
     * @type {T}
     * @memberof EntityLink
     */
    model: T

    constructor(url: URL, name: string) {
        this.url = url;
        this.name = name;
    }

    /**
     * Flag beschreibt, ob die Entität bereits geladen wurde.
     *
     * @returns {boolean}
     * @memberof EntityLink
     */
    entityLoaded(): boolean {
        return this.model != null;
    }
}