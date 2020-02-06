/**
 * Repräsentiert den Fortschritt eines laufenden Prozesses
 *
 * @export
 * @class ProcessStatus
 */
export class ProcessStatus {
    /**
     * Der Fortschritt in Prozent
     *
     * @type {number}
     * @memberof ProcessStatus
     */
    value: number = 0;
    /**
     * Zum Prozess gehörende Nachrichten
     *
     * @type {Array<string>}
     * @memberof ProcessStatus
     */
    logList: Array<string> = new Array<string>();
    /**
     * Anzahl der noch offenen Schritte
     *
     * @type {number}
     * @memberof ProcessStatus
     */
    openCounter: number = 0;
    /**
     * Anzahl der noch zu erledigenden Schritte
     *
     * @type {number}
     * @memberof ProcessStatus
     */
    doneCounter: number = 0;    

    /**
     * Erhöht die Anzahl der erledigten Schritte um eins und loggt eine Nachricht dazu.
     *
     * @param {string} message
     * @memberof ProcessStatus
     */
    countUp(message: string) : void {
        this._countUp()
        this._log(message)
    }

    /**
     * Erhöht den Zähler erfolgreicher Schritte und Aktualisiert den prozentualen Fortschritt.
     *
     * @private
     * @memberof ProcessStatus
     */
    private _countUp() {
        this.doneCounter += 1;
        this._updateValue();
    }

    /**
     * Kalkuliert den prozentualen Fortschritt des Prozesses neu.
     *
     * @private
     * @memberof ProcessStatus
     */
    private _updateValue() {
        this.value = Math.floor((this.doneCounter / this.openCounter) * 100);
    }

    /**
     * Erfasst eine Nachricht zum Prozessfortschritt.
     *
     * @private
     * @param {string} string
     * @memberof ProcessStatus
     */
    private _log(string: string) {
        this.logList.push(string);
    }
}
